import { graphql, useStaticQuery } from "gatsby";

const roadmapQuery = graphql`
{
  allMarkdownRemark(sort: {order: ASC, fields: frontmatter___id}, filter: {fileAbsolutePath: {regex: "/data/roadmap/"}}) {
    edges {
      node {
        frontmatter {
          title
          id
        }
        rawMarkdownBody
      }
    }
  }
}
`;

export const useRoadmap = () => {
  const data = useStaticQuery(
    roadmapQuery
  );

  return data.allMarkdownRemark.edges.map(({ node }) => ({
      description: node.rawMarkdownBody,
      ...node.frontmatter
  }));
};
