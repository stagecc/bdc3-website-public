import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { Title, Heading, Meta } from "../../components/typography";
import { InlineList2 } from "../../components/list";
import { TagLink } from "../../components/link";
// import { ClockIcon } from "../components/icons";
import { useWindowWidth } from "../../hooks";

const ArticlePreview = styled.article`
  margin: 4rem 0;
`;

const Details = styled(Meta)`
  display: flex;
  flex-direction: ${(props) => (props.compact ? "column" : "row")};
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

const Tags = styled(Meta)``;

const PublishDate = styled.span`
  flex: 1;
`;

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
