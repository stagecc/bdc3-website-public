import { graphql, useStaticQuery } from 'gatsby'

const fellowsQuery = graphql`
    {
        fellows: allMarkdownRemark(
            sort: {fields: fileAbsolutePath, order: ASC}
            filter: {fileAbsolutePath: {regex: "/data/fellows/"}}
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        name
                        university
                        abstract
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
            }
        }
    }
`

export const useFellows = () => {
    const { fellows } = useStaticQuery(fellowsQuery)
    return fellows.edges.map(({ node }) => ({ id: node.id, ...node.frontmatter }))
}
