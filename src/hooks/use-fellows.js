import { graphql, useStaticQuery } from "gatsby";

export const fellowFragment = graphql`
  fragment FellowDetails on MarkdownRemark {
    id
    frontmatter {
      name
      university
      project {
        title
        abstract
      }
      bio
      photo {
        childImageSharp {
          fixed(fit: CONTAIN, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;

const fellowsQuery = graphql`{
  avatar: file(relativePath: {regex: "/avatar.png/"}) {
    childImageSharp {
      fixed {
        ...GatsbyImageSharpFixed
      }
    }
  }
  cohortOne: allMarkdownRemark(
    sort: {fileAbsolutePath: ASC}
    filter: {fileAbsolutePath: {regex: "/data/fellows/cohort1/"}}
  ) {
    edges {
      node {
        ...FellowDetails
      }
    }
  }
  cohortTwo: allMarkdownRemark(
    sort: {fileAbsolutePath: ASC}
    filter: {fileAbsolutePath: {regex: "/data/fellows/cohort2/"}}
  ) {
    edges {
      node {
        ...FellowDetails
      }
    }
  }
  cohortThree: allMarkdownRemark(
    sort: {fileAbsolutePath: ASC}
    filter: {fileAbsolutePath: {regex: "/data/fellows/cohort3/"}}
  ) {
    edges {
      node {
        ...FellowDetails
      }
    }
  }
}`;

export const useFellows = () => {
  const { avatar, cohortOne, cohortTwo, cohortThree } = useStaticQuery(
    fellowsQuery
  );
  return {
    avatar,
    cohortOne: cohortOne.edges.map(({ node }) => ({
      id: node.id,
      ...node.frontmatter
    })),
    cohortTwo: cohortTwo.edges.map(({ node }) => ({
      id: node.id,
      ...node.frontmatter
    })),
    cohortThree: cohortThree.edges.map(({ node }) => ({
      id: node.id,
      ...node.frontmatter
    }))
  };
};
