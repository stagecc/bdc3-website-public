const path = require(`path`);
const fetch = require(`node-fetch`);
const fs = require('fs');

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

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const requestUrl = `https://gen3.biodatacatalyst.nhlbi.nih.gov/mds/metadata?_guid_type=discovery_metadata&limit=2000&data=true`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  });

  if(!response.ok) {
    throw new Error(response);
  }

  const data = await response.json();

  // ------ transform response data ------
  const mdsStudiesList = [];
  const mdsCovidList = [];

  // iterate over each study
  for (const study of Object.values(data)) {
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
      mdsCovidList.push(row);
    } else {
      mdsStudiesList.push(row);
    }
  }

  // ------ write updated data to src/data/studies directory ------
  const stringifiedMdsCovidList = JSON.stringify(mdsCovidList, null, 2);
  const stringifiedMdsStudiesList = JSON.stringify(mdsStudiesList, null, 2);

  fs.writeFileSync(
    'src/data/studies/covid-studies.json',
    stringifiedMdsCovidList,
    { encoding: 'utf-8' }
  );
  fs.writeFileSync(
    'src/data/studies/studies.json',
    stringifiedMdsStudiesList,
    { encoding: 'utf-8' }
  );
  
  // ------ create gatsby graphql nodes ------
  const covidNodeMeta = {
    id: createNodeId(`mds-external-covid-studies`),
    parent: null,
    children: [],
    internal: {
      type: `MDSExternalCovidStudies`,
      mediaType: `application/json`,
      content: stringifiedMdsCovidList,
      contentDigest: createContentDigest(mdsCovidList),
    }
  }
  createNode({ stringifiedMdsCovidList, ...covidNodeMeta });
    
  const studiesNodeMeta = {
    id: createNodeId(`mds-external-covid-studies`),
    parent: null,
    children: [],
    internal: {
      type: `MDSExternalStudies`,
      mediaType: `application/json`,
      content: stringifiedMdsStudiesList,
      contentDigest: createContentDigest(mdsStudiesList),
    }
  }
  createNode({ stringifiedMdsStudiesList, ...studiesNodeMeta });
};
