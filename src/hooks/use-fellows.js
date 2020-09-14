import { graphql, useStaticQuery } from 'gatsby'

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
`

const fellowsQuery = graphql`
    {
        cohortOne: allMarkdownRemark(
            sort: {fields: fileAbsolutePath, order: ASC}
            filter: {fileAbsolutePath: {regex: "/data/fellows/cohort1/"}}
        ) {
            edges {
                node {
                    ...FellowDetails
                }
            }
        }
        cohortTwo: allMarkdownRemark(
            sort: {fields: fileAbsolutePath, order: ASC}
            filter: {fileAbsolutePath: {regex: "/data/fellows/cohort2/"}}
        ) {
            edges {
                node {
                    ...FellowDetails
                }
            }
        }
    }
`

export const useFellows = () => {
    const { cohortOne, cohortTwo } = useStaticQuery(fellowsQuery)
    return {
        cohortOne: cohortOne.edges.map(({ node }) => ({ id: node.id, ...node.frontmatter })),
        cohortTwo: cohortTwo.edges.map(({ node }) => ({ id: node.id, ...node.frontmatter })),
    }
}
