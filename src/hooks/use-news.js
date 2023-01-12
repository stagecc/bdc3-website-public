import { graphql, useStaticQuery } from "gatsby";

const newsQuery = graphql`{
  news: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/latest-updates/"}}
    limit: 2
    sort: {frontmatter: {date: DESC}}
  ) {
    edges {
      node {
        frontmatter {
          path
          date(formatString: "MMMM D, YYYY")
          title
          subtitle
          tags
        }
        excerpt(pruneLength: 120)
      }
    }
  }
}`;

export const useNews = () => {
  const { news } = useStaticQuery(newsQuery);
  return news.edges.map(({ node }) => ({
    ...node.frontmatter,
    excerpt: node.excerpt,
  }));
};
