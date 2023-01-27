const path = require(`path`);
const fetch = require(`node-fetch`);
const fs = require('fs/promises');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const platformTemplate = path.resolve(`src/templates/platform-template.js`);
  const redirectTemplate = path.resolve(`src/templates/redirect-template.js`);
  const articleTemplate = path.resolve(`src/templates/article-template.js`);
  const tagTemplate = path.resolve(`src/templates/tag-template.js`);
  const eventTemplate = path.resolve(`src/templates/events/event-template.js`);
  const eventsTemplate = path.resolve(
    `src/templates/events/upcoming-events-template.js`
  );
  const eventsArchiveTemplate = path.resolve(
    `src/templates/events/past-events-template.js`
  );
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title] }
        limit: 10
        filter: { fileAbsolutePath: { regex: "/data/platforms/" } }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      allRedirectsJson {
        edges {
          node {
            from
            to
          }
        }
      }
    }
  `);

  const newsResults = await graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              path
              title
              date(formatString: "MMMM DD, YYYY")
              tags
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // Create news items pages
  const articles = newsResults.data.allMarkdownRemark.edges.filter(({ node }) =>
    node.fileAbsolutePath.includes("/latest-updates/")
  );
  articles.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: articleTemplate,
      context: {
        // additional data passed via context
        prev: index === 0 ? null : articles[index - 1].node,
        next: index === articles.length - 1 ? null : articles[index + 1].node,
      },
    });
  });
  // Create single event pages
  const events = newsResults.data.allMarkdownRemark.edges.filter(({ node }) =>
    node.fileAbsolutePath.includes("/events/")
  );
  events.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: eventTemplate,
      context: {
        // additional data passed via context
        prev: index === 0 ? null : events[index - 1].node,
        next: index === events.length - 1 ? null : events[index + 1].node,
      },
    });
  });
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(`Creating page: ${node.frontmatter.path}`);
    createPage({
      path: node.frontmatter.path,
      component: platformTemplate,
      context: {}, // additional data can be passed via context
    });
  });
  result.data.allRedirectsJson.edges.forEach(({ node }) => {
    console.log(`Creating redirect: ${node.from} > ${node.to}`);
    createPage({
      path: node.from,
      component: redirectTemplate,
      context: node,
    });
  });
  const todaysDate = new Date();
  const dateString = `${todaysDate.getFullYear()}-${
    todaysDate.getMonth() + 1 < 10 ? "0" : ""
  }${todaysDate.getMonth() + 1}-${
    todaysDate.getDate() < 10 ? "0" : ""
  }${todaysDate.getDate()}`;
  // Create upcoming event list page
  createPage({
    path: "/about/events",
    component: eventsTemplate,
    context: {
      todaysDate: dateString,
    },
  });
  // Create archived event list page
  createPage({
    path: "/about/events/archive",
    component: eventsArchiveTemplate,
    context: {
      todaysDate: dateString,
    },
  });
  // Create tag pages
  const allTags = new Set();
  articles.concat(events).forEach(
    ({
      node: {
        frontmatter: { tags },
      },
    }) => {
      if (!Array.from(tags)) return;
      tags.forEach((tag) => allTags.add(tag));
    }
  );
  allTags.forEach((tag) => {
    createPage({
      path: `/tagged/${tag}`,
      component: tagTemplate,
      context: { tag },
    });
  });

  return [...articles, ...events];
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@nivo/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

/**
 * @returns a json object containing containing raw MDS data or null if there is an error fetching
 */
async function queryMds() {
  const baseUrl = "https://gen3.biodatacatalyst.nhlbi.nih.gov/mds";
  const endpoint = "metadata";
  const guidType = "discovery_metadata";
  const limit = 2000;
  const returnData = "true";
  
  const requestUrl = `${baseUrl}/${endpoint}?_guid_type=${guidType}&limit=${limit}&data=${returnData}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  });

  if(!response.ok) {
    console.error(`Error fetching from ${requestUrl}:\n`, response);
    return null;
  };

  return await response.json();
}

/**
 * Splits `rawMdsData` into two objects (one for regular studies, one for COVID studies),
 * renames several fields, and coverts from named keys to an array of studies
 * @param rawMdsData
 * @returns {{ mdsStudiesList, mdsCovidList }} keys for each array of studies
 */
function transformStudies(rawMdsData) {
  const studies = [];
  const covidStudies = [];

  // iterate over each study
  for (const study of Object.values(rawMdsData)) {
    let isCovidStudy = false;

    const studyMetadata = study['gen3_discovery'];

    // check if study is tagged with 'COVID 19'
    for(const tag of studyMetadata['tags']) {
      if(tag.name.includes('COVID 19'))
        isCovidStudy = true;
    }

    // strip consent
    const fullAccession = studyMetadata['dbgap_accession'];
    const accession = fullAccession.split('').splice(0, fullAccession.indexOf('.c')).join('');

    // write values to row:
    const row = {
      "Accession": accession,
      "Cohort Abbreviation": studyMetadata['short_name'],
      "Name": studyMetadata['full_name'],
      "Description": studyMetadata['study_description'],
      "Consent Code": studyMetadata['dbgap_consent'],
      "Consent Short": studyMetadata['study_id'],
      "Subject Count": studyMetadata['_subjects_count'],
    }

    if(isCovidStudy) {
      covidStudies.push(row);
    } else {
      studies.push(row);
    }
  }

  return { studies, covidStudies }
}

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {

  const rawMdsData = await queryMds();

  let studies, studiesStringified, covidStudies, covidStudiesStringified;

  if(rawMdsData) {
    ({ studies, covidStudies } = transformStudies(rawMdsData));

    // write files to src/data/studies directory
    studiesStringified = JSON.stringify(studies, null, 2);
    covidStudiesStringified = JSON.stringify(covidStudies, null, 2);
    await fs.writeFile('src/data/studies/studies.json', studiesStringified, { encoding: 'utf-8' });
    await fs.writeFile('src/data/studies/covid-studies.json', covidStudiesStringified, { encoding: 'utf-8' });

  }
  else {
    console.log('Unable to fetch studies from MDS, using json in src/data/studies');

    // read and parse json files in memory
    studiesStringified = await fs.readFile('src/data/studies/studies.json', { encoding: 'utf-8' });
    studies = JSON.parse(studiesStringified);
    covidStudiesStringified = await fs.readFile('src/data/studies/covid-studies.json', { encoding: 'utf-8' });
    covidStudies = JSON.parse(covidStudiesStringified);
  }

  // create gatsby graphql nodes
  const studiesNodeMeta = {
    id: createNodeId(`mds-studies`),
    parent: null,
    children: [],
    internal: {
      type: `MDSStudies`,
      mediaType: `application/json`,
      content: studiesStringified,
      contentDigest: createContentDigest(studies),
    }
  }
  createNode({ studiesStringified, ...studiesNodeMeta });

  const covidStudiesNodeMeta = {
    id: createNodeId(`mds-covid-studies`),
    parent: null,
    children: [],
    internal: {
      type: `MDSCovidStudies`,
      mediaType: `application/json`,
      content: covidStudiesStringified,
      contentDigest: createContentDigest(covidStudies),
    }
  }
  createNode({ covidStudiesStringified, ...covidStudiesNodeMeta });
};
