import React from "react";
import styled from "styled-components";
import { graphql} from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../../components/seo";
import { Title, Subtitle, Meta, Heading } from "../../components/typography";
import { InlineList2 } from "../../components/list";
import { TagLink } from "../../components/link";
import { PageContent } from "../../components/layout";
import { Visible } from "react-grid-system";
import { HorizontalRule } from "../../components/horizontal-rule";
import { Link } from "../../components/link";
import { Markdown } from "../../components/markdown"
import { useWindowWidth } from "../../hooks";
import './module.css'

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
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.compact ? "column" : "row")};
  justify-content: center;
  align-items: ${props => (props.compact ? "center" : "flex-start")};
  margin-bottom: 3rem;
 
`;

const PhotoWrapper = styled.div`
  margin: 2rem;
  max-width: 231px;
  max-height: 200px;
  min-width: 231px;
  min-height: 200px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`;

const FellowPhoto = styled(Img)`
  max-width: 231px;
  max-height: 200px;
  min-width: 231px;
  min-height: 200px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  transition: filter 250ms, transform 500ms;
  transform: scale(1);
  transform-origin: center center;
`;

const FellowDetails = styled.div`
  flex: 1;
`;

export default ({ data, pageContext }) => {
  const { markdownRemark: { frontmatter, html } } = data;
  const { prev, next } = pageContext;
  const { isCompact } = useWindowWidth();

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
          <Meta>Published on {frontmatter.date} {frontmatter.author && (<span>| Authored by {frontmatter.author}</span>)}</Meta>
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
          <div className="page-content" dangerouslySetInnerHTML={{ __html: html }} />

          <HorizontalRule />

          {/* author block */}
          <Heading>About the Authors</Heading>

          {frontmatter.authors && frontmatter.authors.map((author)=> (
            <div>
                <FlexWrapper compact={isCompact}>
                  <PhotoWrapper>
                    <FellowPhoto fixed={frontmatter.speakerImage.childImageSharp.fluid} />
                  </PhotoWrapper>
                  <FellowDetails>
                    {author.name && (
                      <h3>{author.name}</h3>
                    )}
                    {author.description && (
                      <Markdown src={author.description}/>
                    )}
                  </FellowDetails>
                </FlexWrapper>
            </div>
          ))}
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
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        author
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
        authors {
					name
          description
        }
      }
    }
  }
`;
