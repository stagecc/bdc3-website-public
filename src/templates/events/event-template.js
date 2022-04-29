import React from "react";
import styled from "styled-components";
// import { AnimateOnMount } from "../../components/anim"
import { SEO } from "../../components/seo";
import { graphql} from "gatsby";
import { Link } from "../../components/link";
import { Title, Meta, EventMetaData } from "../../components/typography";
import { InlineList2 } from "../../components/list";
import { TagLink } from "../../components/link";
import { Module, PageContent } from "../../components/layout";
import { Visible } from "react-grid-system";
import { HorizontalRule } from "../../components/horizontal-rule";
import { ButtonCta } from "../../components/buttons";
import { Markdown } from '../../components/markdown'

const EventMetadataWrapper = styled.div`
  ${Meta} {
    margin: 0;
  }
`;

export default ({ data, pageContext }) => {
  const { markdownRemark: { frontmatter, rawMarkdownBody } } = data;
  const { prev, next } = pageContext;
  const {
    title,
    date,
    display_date,
    time,
    // location,
    tags,
    url,
    presenter,
    presentation_link,
    seo,
  } = frontmatter;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <div className="event-item-container">
        <div className="event-item">
          <Title>{title}</Title>

          <EventMetadataWrapper>
            <EventMetaData title="Date">
              {display_date ? display_date : date}
            </EventMetaData>
            {time && <EventMetaData title='Time'>{time}</EventMetaData>}
            {/* <EventMetaData>
              <b>Location</b>: {location}
            </EventMetaData> */}
            {url && (
              <EventMetaData title="Meeting Details">
                <a href={url} target="_blank" rel="noreferrer noopener" style={{fontWeight:"300"}}>
                  {url}
                </a>
              </EventMetaData>
            )}
            {presenter && (
              <EventMetaData>
                <b>Presenter</b>: {presenter}
              </EventMetaData>
            )}
            {presentation_link && (
              <EventMetaData>
                <b>Presentation Link</b>:{" "}
                <a
                  href={presentation_link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {presentation_link}
                </a>
              </EventMetaData>
            )}
            <EventMetaData title="Tags">
              <InlineList2
                items={tags.map((tag) => (
                  <TagLink tag={tag} 
                  style={{fontWeight:"400"}}  
                  />
                ))}
              />
            </EventMetaData>
            {/* <br></br>
            <br></br> */}
            {/* <div style={{ textAlign: "center" }}>
              <ButtonCta href={url} target="_blank">
                Register Now!
              </ButtonCta>
            </div> */}
          </EventMetadataWrapper>

          <Module title="Event Details">
            <Markdown src={ rawMarkdownBody } />
          </Module>
          {/* <div style={{ textAlign: "center" }}>
            <ButtonCta href={url} target="_blank">
              Register Now!
            </ButtonCta>
          </div> */}
        </div>
      </div>

      <HorizontalRule />

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          {prev && (
            <Link to={prev.frontmatter.path}>
              PREVIOUS{" "}
              <Visible md lg xl>
                EVENT
              </Visible>{" "}
              <br />
              <Meta>
                {prev.frontmatter.title}
                <br />
                <small>on {prev.frontmatter.date}</small>
              </Meta>
            </Link>
          )}
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          {next && (
            <Link to={next.frontmatter.path}>
              NEXT{" "}
              <Visible md lg xl>
                EVENT
              </Visible>{" "}
              <br />
              <Meta>
                {next.frontmatter.title}
                <br />
                <small>on {next.frontmatter.date}</small>
              </Meta>
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
        date(formatString: "MMMM D, YYYY")
        display_date
        location
        title
        time
        url
        tags
        seo {
          title
          description
          keywords
        }
      }
    }
  }
`;

// export const newsItemQuery = graphql`
//   query($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         date(formatString: "MMMM D, YYYY")
//         display_date
//         time
//         location
//         title
//         urlLabel
//         url
//         tags
//         fabricHosted
//         presenter
//         presentation_link
//         seo {
//           title
//           description
//           keywords
//         }
//       }
//     }
//   }
// `;
