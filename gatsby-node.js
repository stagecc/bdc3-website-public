const path = require(`path`);

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
    path: "/events",
    component: eventsTemplate,
    context: {
      todaysDate: dateString,
    },
  });
  // Create archived event list page
  createPage({
    path: "/events/archive",
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
