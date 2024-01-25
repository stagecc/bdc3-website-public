import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { graphql} from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../../components/seo";
import { Title, Subtitle, Meta, Heading, Paragraph, Subheading, Subsubheading } from "../../components/typography";
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
import {
  Button,
  Collapse,
  Stack,
} from '@mui/material'

const ExpandIcon = ({ expanded }) => <ExpandMoreIcon sx={{
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 250ms',
}} />;

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
const FlexWrapper = styled.div(({ compact, partial }) => (`
  display: flex;
  gap: 1rem;
  flex-direction: ${compact ? 'column' : partial ? 'column' : 'row'};
  max-width: ${partial ? '400px' : '100%'};
  float: ${partial ? 'left' : 'none'};
  justify-content: center;
  align-items: ${compact ? 'center' : partial ? 'center': 'flex-start'};
  margin-bottom: 2rem;
  background-color: #EFEFEF;
  padding: 1rem;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.1));
  margin-right: ${partial ? '2rem' : 'inherit'};
  text-align: ${partial ? 'center' : 'inherit'};
  `));

const PhotoWrapper = styled.div`
  margin: 1rem;
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`;

const AuthorPhoto = styled(Img)`
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  clip-path: circle(100%);
  transition: filter 250ms;
  border: 6px solid #b33243;
  border-radius: 50%;
`;

const AuthorDetails = styled.div`
  flex: 1;
  overflow-y: hidden;
  position: relative;
  padding-right: 2rem;
  &::after {
    content: "";
    position: absolute;
    background-image: linear-gradient(#ffffff00, #efefef);
    bottom: 0;
    left: 0;
    right: 0;
    height: 2rem;
    max-height: 2rem;
    pointer-events: none;
    display: ${props => (props.expand && "none")};
  } ;
`;


const ArticleNavigation = ({ prev, next }) => {
  return (
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
  )
}

const AuthorCard = ({ author }) => {
  const { isCompact } = useWindowWidth()
  const [expanded, setExpanded] = useState()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  };

  return (
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
        <Stack alignItems="flex-end">
          <Button
            onClick={handleExpandClick}
            endIcon={<ExpandIcon expanded={expanded } />}
            aria-expanded={expanded }
            aria-label="read more"
            size="small"
            sx={{
              color: "var(--color-blueberry-dark)",
              fontFamily: "inherit",
            }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
        </Stack>
      </div>
    </FlexWrapper>
  )
}


const ContributorWrapper = styled.div(({ compact, partial }) => (`
display: flex;
flex-direction: column;
max-width: ${compact ? '100%' : '400px'};
float: left;
justify-content: center;
align-items: center;
margin-bottom: 1rem;
margin-right: ${compact ? '0' : '2rem'};
background-color: #EFEFEF;
padding: 0 1rem 0 ;
border-radius: 5px;
filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.1));
`));

const ContributorDetails = styled.div`
flex: 1;
padding: 0 1rem;
text-align: left;
font-size: 80%;
`;

const ContributorCard = ({contributor, partial}) => {
  const { isCompact } = useWindowWidth()
  const [expanded, setExpanded] = useState()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  };

  return (
    <ContributorWrapper compact={isCompact} partial={partial}>
      <PhotoWrapper>
        <AuthorPhoto fluid={contributor.image.childImageSharp.fluid} />
      </PhotoWrapper>

        <ContributorDetails >
          {contributor.name && (
            <Fragment>
              <Heading style={{color: '#b33243', marginBottom: 0, paddingBottom: 0}}> About {contributor.name}</Heading>
              <Subheading style={{color: '#444444', fontStyle: 'italic', fontWeight: '500'}}>Researcher, University of Colorado</Subheading>
              <Markdown src={contributor.description} style={{marginTop: "0"}}/>
            </Fragment>
          )}
        </ContributorDetails>

    </ContributorWrapper>
  )
}

const TagsList = ({ tags }) => (
  <Meta>
    <InlineList2
      title="Tags"
      items={tags.map(tag => <TagLink key={`tag-${ tag }`} tag={tag} />)}
    />
  </Meta>
)

export default ({ data, pageContext }) => {
  const { markdownRemark: { frontmatter, html, timeToRead } } = data;
  const { prev, next } = pageContext;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
        keywords={frontmatter.seo.keywords}
      />
      <Title>{frontmatter.title}</Title>
      {
        frontmatter.subtitle && (
          <Subtitle className="article-subtitle">
          {frontmatter.subtitle}
          </Subtitle>
        )
      }

      <Stack justifyContent="space-between" flexDirection="row">
        <Meta>
          Published on {frontmatter.date} {' '}
          {frontmatter.author && <span>| Authored by {frontmatter.author}</span>}
        </Meta>
        <Meta>
          {timeToRead} minute read
        </Meta>
      </Stack>

      <TagsList tags={frontmatter.tags} />

      {frontmatter.speakerImage && (
        <SpeakerImageWrapper>
          <SpeakerImage fluid={frontmatter.speakerImage.childImageSharp.fluid}/>
        </SpeakerImageWrapper>
      )}

      {
        frontmatter.contributor && (
          <ContributorCard contributor={frontmatter.contributor} partial/>
        )
      }
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

      {frontmatter.authors && frontmatter.authors.map((author, id) => (
        <div key={`author-${id}`}>
          <AuthorCard author={author} />
        </div>
      ))}

      <HorizontalRule />

      <ArticleNavigation prev={prev} next={next} />

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
        contributor {
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

