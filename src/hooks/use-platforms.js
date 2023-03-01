import { graphql, useStaticQuery } from "gatsby";

const platformsQuery = graphql`
  {
    platforms: allMarkdownRemark(
      sort: { fields: frontmatter___logo___relativePath }
      filter: { fileAbsolutePath: { regex: "/data/platforms/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            serviceTitle
            poweredBy
            path
            links {
              homepage
              launch
              documentation
            }
            about
            service
            logo {
              id
              childImageSharp {
                fixed(fit: CONTAIN, height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const usePlatforms = () => {
  const { platforms } = useStaticQuery(platformsQuery);
  return platforms.edges.map(({ node }) => node);
};
