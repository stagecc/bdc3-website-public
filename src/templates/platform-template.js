import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../components/seo";
import styled from "styled-components";
import { PageContent } from "../components/layout";
import { Title, Heading, Paragraph } from "../components/typography";
import { Link } from "../components/link";

const KeyFeaturesList = styled.div`
  & p {
    margin: 0;
  }
  & li {
    margin: 0;
    padding: 0;
    line-height: 2;
  }
`;

const LinkList = styled(Paragraph)``;

const LogoContainer = styled.div`
  min-width: 300px;
  text-align: center;
`;

export default ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const platformLogoFixed = frontmatter.logo ? frontmatter.logo.childImageSharp.fixed: null;

  return (
    <PageContent width="95%" maxWidth="1080px" center gutters>
      <SEO title={`About ${frontmatter.title}`} description="" keywords="" />
      
      {
        frontmatter.logo && (
          <LogoContainer>
            <Img fixed={platformLogoFixed} />
          </LogoContainer>
        )
      }

      <Title center>{frontmatter.title}</Title>

{
  frontmatter.links.launch || frontmatter.links.documentation ? (
    <Fragment>
      <LinkList center>
        { frontmatter.links.launch && (<Link to={frontmatter.links.launch}>Launch</Link>)}
        { frontmatter.links.launch && frontmatter.links.documentation &&(<> |{" "}</>)}
        { frontmatter.links.documentation && (<Link to={frontmatter.links.documentation}>Documentation</Link>)}
      </LinkList>
    </Fragment>
  ) : null
}

      <Heading>About {frontmatter.title}</Heading>

      <Paragraph>{frontmatter.about}</Paragraph>

      <Heading>Key Features</Heading>

      <KeyFeaturesList dangerouslySetInnerHTML={{ __html: html }} />
    </PageContent>
  );
};

export const platformQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
        links {
          launch
          documentation
        }
        about
        logo {
          childImageSharp {
            fixed(fit: COVER, width: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      html
    }
  }
`;
