import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { graphql} from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../../components/seo";
import { Title, Subtitle, Meta, Heading, Paragraph } from "../../components/typography";
import { InlineList2 } from "../../components/list";
import { TagLink } from "../../components/link";
import { PageContent } from "../../components/layout";
import { Visible } from "react-grid-system";
import { HorizontalRule } from "../../components/horizontal-rule";
import { Link } from "../../components/link";
import { Markdown } from "../../components/markdown"
import { useWindowWidth } from "../../hooks";
import './module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ButtonBase from '@mui/material/ButtonBase'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({  expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

const SpeakerImageWrapper = styled.div`
  @media screen and (max-width: 650px){
    width: 100%
  }
`
const SpeakerImage = styled(Img)`
  margin: 0 2rem 1rem 0;
  width: 240px;
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
  margin-bottom: 2rem;
  background-color: #EFEFEF;
  padding: 0.75rem 2rem 0.5rem;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.1));
`;

const PhotoWrapper = styled.div`
  margin: 1.75rem 1rem;
  max-width: 231px;
  max-height: 200px;
  min-width: 231px;
  min-height: 200px;
  /* clip-path: circle(60%); */
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`;

const AuthorPhoto = styled(Img)`
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  clip-path: circle(100%);
  transition: filter 250ms, transform 500ms;
  transform: scale(1);
  transform-origin: center center;
  border: 6px solid #b33243;
  border-radius: 100%;
`;

const AuthorDetails = styled.div`
  flex: 1;
  overflow-y: hidden;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    background-image: linear-gradient(#ffffff00, #EFEFEF);
    bottom: 0;
    left: 0;
    right: 0;
    height: 2rem;
    max-height: 2rem;
    pointer-events: none;
    display: ${props => (props.expand && "none")};
  } ;
`;

export default ({ data, pageContext }) => {
  const { markdownRemark: { frontmatter, html, timeToRead } } = data;
  const { prev, next } = pageContext;
  const { isCompact } = useWindowWidth();
  const [expandedIndices, setExpandedIndices] = useState(new Set())

  const handleExpandClick = index => {
    // copy of expandedIndices state variable
    const newExpandedIndices = new Set([...expandedIndices])
    //remove if there ; add if not
    if (newExpandedIndices.has(index)) {
      newExpandedIndices.delete(index)
    } else {
      newExpandedIndices.add(index)
    }
    setExpandedIndices(newExpandedIndices)
  };

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
          <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
            <Meta>
              Published on {frontmatter.date} {frontmatter.author && 
              (<span>| Authored by {frontmatter.author}</span>)
              }
            </Meta>
            <Meta>
              {timeToRead} minute read
            </Meta>
          </div>

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

          {/* author block */}
          {frontmatter.authors && (
            <Fragment>
              <HorizontalRule />
              
              <Heading>About This Article</Heading>
              <Paragraph>
                This article was written with information provided by the following participants.
              </Paragraph>
            </Fragment>
          )}

          {frontmatter.authors && frontmatter.authors.map((author, id)=> {
            const expanded = expandedIndices.has(id)

            return (
            <div key={`author-${id}`}>
                <FlexWrapper compact={isCompact}>
                  <PhotoWrapper>
                    <AuthorPhoto fixed={author.image.childImageSharp.fluid} />
                  </PhotoWrapper>

                  <div>
                    <AuthorDetails expand={expanded}>
                      {author.name && (
                        <h3>{author.name}</h3>
                      )}
                      {author.description && (
                        <Collapse 
                          in={expanded}  
                          collapsedSize="150px"
                          orientation="vertical"
                        >
                          <Markdown src={author.description} style={{marginTop: "0"}}/>
                        </Collapse>
                      )}
                    </AuthorDetails>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                      <ButtonBase onClick={() => handleExpandClick(id)} sx={{color: "#01366a"}}>
                        Read More
                        <ExpandMore
                          expand={expanded}
                          aria-expanded={expanded}
                          aria-label="read more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </ButtonBase>
                    </div>
                  </div>
                </FlexWrapper>
            </div>
          )}
          )}
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
      timeToRead
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
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }  
          }
          description
        }
      }
    }
  }
`;

