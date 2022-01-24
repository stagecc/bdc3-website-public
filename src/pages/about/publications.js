import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title } from "../../components/typography";

const ResearchPage = ({ data }) => {

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="BioData Catalyst Published Research"
        description="View published research that has been built on BioData Catalyst"
        keywords={["pubilsh", "research"]}
      />
      <Title>Published Research</Title>
    </PageContent>
  );
};

// export const query = graphql`
//   query {
//     allMarkdownRemark(
//       sort: { fields: frontmatter___date, order: DESC }
//       filter: { fileAbsolutePath: { regex: "/latest-updates/" } }
//     ) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           timeToRead
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             path
//             title
//             tags
//           }
//         }
//       }
//     }
//   }
// `;

export default ResearchPage;
