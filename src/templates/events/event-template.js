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
import { Card, CardBody } from "../../components/card";

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

const EventInfo = ({date, display_date, time,  tags, url, registration_required }) => {
return (
  <Fragment>
    
    <EventInfoLine title="Date">
      {display_date ? display_date : date}
    </EventInfoLine>
    
    {time && <EventInfoLine title='Time'> {time} </EventInfoLine>}
       
    {registration_required ? (
      <EventInfoLine title="Location">
      Zoom (
      <Link to={url} >
        Click Here to Register
      </Link>)
    </EventInfoLine>

    ) : (
      <EventInfoLine title="Location">
      Zoom (
      <Link to={url} >
        Click Here to Join
      </Link>)
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
    tags,
    zoom,
    url,
    registration_required,
    seo,
  } = frontmatter;

  const todaysDate = new Date();

  const dateString = `${todaysDate.getFullYear()}-${
    todaysDate.getMonth() + 1 < 10 ? "0" : ""
  }${todaysDate.getMonth() + 1}-${
    todaysDate.getDate() < 10 ? "0" : ""
  }${todaysDate.getDate()}`;

  const parsedEventDate = new Date(Date.parse(date))

  const eventDate = `${parsedEventDate.getFullYear()}-${
    parsedEventDate.getMonth() + 1 < 10 ? "0" : ""
  }${parsedEventDate.getMonth() + 1}-${
    parsedEventDate.getDate() < 10 ? "0" : ""
  }${parsedEventDate.getDate()}`

  const past = dateString > eventDate ? true : false

  const forumURL = "https://bdcatalyst.freshdesk.com/support/discussions/forums/60000122778"
  
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title={seo.title}
        description={seo.description}
      />
      <div className="event-item-container">
        <div className="event-item">
          <Title>{title}</Title>

        {
          past && (
            <Card>
              <CardBody>
                <Meta>
                  This event has passed. To view session materials click <Link to={presentation_link ? presentation_link : forumURL }>
                     here
                    </Link>
                  .
                </Meta>
              </CardBody>
            </Card>
          )
        }
          <EventMetadataWrapper>
            <EventInfo
                  date={date}
                  display_date={display_date}
                  time={time}
                  url={zoom ? zoom.url : url}
                  tags={tags}
                  registration_required={registration_required}
            />
          </EventMetadataWrapper>

          {registration_required && (
            <div style={{ textAlign: "center", paddingTop: '2rem'}}>
              <ButtonCta href={url} target="_blank">
                Register Now!
              </ButtonCta>
            </div>
          )}

          <Module title="Event Details">
            <Markdown src={ rawMarkdownBody } />
          </Module>

          {/* * TODO: Conditionally render second button if the markdown is longer than a certain number of characters */}
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
        title
        time
        url
        tags
        registration_required
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
