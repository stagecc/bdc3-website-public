import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'

// import { AnimateOnMount } from "../../components/anim"
import { SEO } from "../../components/seo";
import { graphql} from "gatsby";
import { Link } from "../../components/link";
import { Title, Meta } from "../../components/typography";
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

const EventInfoLine = ({title, children}) => {
  return (
    <Fragment>
      <p style={{
        margin: '0.1rem 0',
        fontSize: '1.1rem',
        lineHeight: '1.5',
        fontWeight: '300',
        '& strong': {
          fontWeight: '600'
        }
      }}>
        {title && <strong>{title}: </strong>}
        {children}
      </p>
    </Fragment>
  )
}

EventInfoLine.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const EventInfo = ({date, display_date, time, location,  tags,  url,  presenter,  presentation_link }) => {
return (
  <Fragment>
    <EventInfoLine title="Date"> {display_date ? display_date : date} </EventInfoLine>
    {time && <EventInfoLine title='Time'> {time} </EventInfoLine>}
    {location && <EventInfoLine title='Location'> {location} </EventInfoLine>}
    {url && (
      <EventInfoLine title="Meeting Details">
        <a href={url} target="_blank" rel="noreferrer noopener">
          {url}
        </a>
      </EventInfoLine>
    )}
    {presenter && <EventInfoLine title='Presenter'> {presenter} </EventInfoLine>}
    {presentation_link && (
      <EventInfoLine title='Presentation Link'>
        <a href={presentation_link} target="_blank" rel="noreferrer noopener">
          {presentation_link}
        </a>
      </EventInfoLine>
    )}
    <EventInfoLine title="Tags">
      <InlineList2
        items={tags.map((tag) => (
          <TagLink tag={tag} 
          style={{fontWeight:"400"}}  
          />
        ))}
      />
    </EventInfoLine>

  </Fragment>
)
}

export default ({ data, pageContext }) => {
  const { markdownRemark: { frontmatter, rawMarkdownBody } } = data;
  const { prev, next } = pageContext;
  const {
    title,
    date,
    display_date,
    time,
    location,
    tags,
    url,
    presenter,
    presentation_link,
    show_registration_button,
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
            <EventInfo
                  date={date}
                  display_date={display_date}
                  time={time}
                  location={location}
                  tags={tags}
                  url={url}
                  presenter={presenter}
                  presentation_link={presentation_link}
            />
          </EventMetadataWrapper>

          {show_registration_button && (
            <div style={{ textAlign: "center" }}>
              <ButtonCta href={url} target="_blank">
                Register Now! {show_registration_button}
              </ButtonCta>
            </div>
          )}

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
        show_registration_button
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
