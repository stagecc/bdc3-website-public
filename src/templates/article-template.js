import React from "react";
import styled from "styled-components";
import { graphql} from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../components/seo";
import { Title, Subtitle, Meta } from "../components/typography";
import { InlineList2 } from "../components/list";
import { TagLink } from "../components/link";
import { PageContent } from "../components/layout";
import { Visible } from "react-grid-system";
import { HorizontalRule } from "../components/horizontal-rule";
import { Link } from "../components/link";
import { Markdown } from '../components/markdown'

const SpeakerImageWrapper = styled.div`
  @media screen and (max-width: 650px){
    width: 100%
  }
`
const SpeakerImage = styled(Img)`
  margin: 0 2rem 1rem 0;
  width: 240px;
  /* filter: drop-shadow(10px 10px 8px rgba(0, 0, 0, 0.1)); */
  float: left;
  @media screen and (max-width: 650px){
    float: none;
    margin: 0 auto 1rem;
  }
`

export default ({ data, pageContext }) => {
  const { markdownRemark: { frontmatter, rawMarkdownBody } } = data;
  const { prev, next } = pageContext;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
        keywords={frontmatter.seo.keywords}
      />
      <div className="news-item-container">
        <div className="news-item">
          <Title>{frontmatter.title}</Title>
          <Subtitle className="article-subtitle">
            {frontmatter.subtitle}
          </Subtitle>
          <Meta>Published on {frontmatter.date}</Meta>
          <Meta>
            <InlineList2
              title="Tags"
              items={frontmatter.tags.map((tag) => (
                <TagLink tag={tag} />
              ))}
            />
          </Meta>
          {frontmatter.speakerImage && (
            <SpeakerImageWrapper>
              <SpeakerImage fluid={frontmatter.speakerImage.childImageSharp.fluid}/>
            </SpeakerImageWrapper>
          )}
          <Markdown src={ rawMarkdownBody } />
        </div>
      </div>

      <HorizontalRule />

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          {prev && (
            <Link to={prev.frontmatter.path}>
              PREVIOUS{" "}
              <Visible md lg xl>
                ARTICLE
              </Visible>
              <br />
              <Meta>{prev.frontmatter.title}</Meta>
            </Link>
          )}
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          {next && (
            <Link to={next.frontmatter.path}>
              NEXT{" "}
              <Visible md lg xl>
                ARTICLE
              </Visible>
              <br />
              <Meta>{next.frontmatter.title}</Meta>
            </Link>
          )}
        </div>
      </div>
    </PageContent>
  );
};

export const newsItemQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      rawMarkdownBody
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        tags
        seo {
          title
          description
          keywords
        }
        speakerImage {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }  
        }
      }
    }
  }
`;
