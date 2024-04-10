import { graphql, useStaticQuery } from "gatsby";

const partnersQuery = graphql`
  query {
    partners: allPartnersYaml {
      edges {
        node {
          id
          name
          ota
          image {
            id
            childImageSharp {
              fixed(fit: CONTAIN, height: 60) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;

export const usePartners = () => {
  const { partners } = useStaticQuery(partnersQuery);
  return partners.edges.map(({ node }) => node);
};
