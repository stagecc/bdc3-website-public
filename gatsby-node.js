const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const platformTemplate = path.resolve(`src/templates/platform-template.js`);
  const redirectTemplate = path.resolve(`src/templates/redirect-template.js`);
  const articleTemplate = path.resolve(`src/templates/article-template.js`);
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
    node.fileAbsolutePath.includes("/news/")
  );
  console.log(articles);
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

  return [...articles];
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
