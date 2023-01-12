import { graphql, useStaticQuery } from "gatsby";

const platformsQuery = graphql`{
  platforms: allMarkdownRemark(
    sort: {frontmatter: {logo: {relativePath: ASC}}}
    filter: {fileAbsolutePath: {regex: "/data/platforms/"}}
  ) {
    edges {
      node {
        frontmatter {
          title
          serviceTitle
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
}`;

export const usePlatforms = () => {
  const { platforms } = useStaticQuery(platformsQuery);
  return platforms.edges.map(({ node }) => node);
};
