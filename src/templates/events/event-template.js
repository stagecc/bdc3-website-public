import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'
import Img from "gatsby-image";
import './module.css'
// import { AnimateOnMount } from "../../components/anim"
import { SEO } from "../../components/seo";
import { graphql} from "gatsby";
import { Link } from "../../components/link";
import { Title, Meta, Subheading } from "../../components/typography";
import { InlineList2 } from "../../components/list";
import { TagLink } from "../../components/link";
import { Module, PageContent } from "../../components/layout";
import { Visible } from "react-grid-system";
import { HorizontalRule } from "../../components/horizontal-rule";
import { ButtonCta } from "../../components/buttons";
import { Markdown } from '../../components/markdown'
import { Card, CardBody } from "../../components/card";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Grid, Stack, Typography, Box, Divider } from '@mui/material'

const EventMeta = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1;
  margin-top: 0;
`

const EventMetadataWrapper = styled.div`
  ${Meta} {
    margin: 0;
  }
`;
const SpeakerImageWrapper = styled.div`
  @media screen and (max-width: 650px){
    width: 100%
  }
`
const SpeakerImage = styled(Img)`
  margin: 0 2rem 1rem 0;
  width: 240px;
  filter: drop-shadow(10px 10px 8px rgba(0, 0, 0, 0.1));
  float: left;
  @media screen and (max-width: 650px){
    float: none;
    margin: 0 auto 1rem;
  }
`
const PastEventAlert = ({forum_post}) => {
  return (
      <Card metaAlert>
        <CardBody style={{backgroundColor: 'rgba(237, 240, 244, 0.8)' }}>
          <Meta>
            This event has passed. {forum_post && (
              <span>
                To view session materials click <Link to={ forum_post }>
                  here
                </Link>
              .
              </span>
              )}
          </Meta>
        </CardBody>
      </Card>
  )
}

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

const EventInfo = ({date, display_date, time, tags, url, registration_required, location, past }) => {
return (
  <Fragment>
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      gap={{ xs: 1, sm: 2, md: 4 }}
      flex
      sx={{width: '100%', marginBottom: '1rem'}}
    >
      <Stack direction="column" sx={{flex: 1}} gap={1}>
        <Subheading noMargin left>Date and Time</Subheading>
        <Grid container spacing={2}>
          <Grid item>
            <CalendarTodayIcon sx={{fontSize:"1.2rem", margin: 0, color:"#21568a"}}/> 
          </Grid>
          <Grid item>
            <EventMeta> {display_date}</EventMeta>
            <EventMeta>{time}</EventMeta>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction="column" sx={{flex: 1}} gap={1}>
        <Subheading noMargin left>Location</Subheading>
        <Grid container spacing={2}>
          <Grid item>
            <LocationOnOutlinedIcon sx={{fontSize:"1.2rem", margin: 0, color:"#21568a"}}/> 
          </Grid>
          <Grid item>
            <Box>
              {
                (!past && url) ? (
                  <EventMeta>
                    {location}: <Link to={url}>Register Here</Link>
                  </EventMeta>
                ) : (
                  <EventMeta>
                    {location}
                  </EventMeta>
                )
              }
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Stack>

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
  const { markdownRemark: { frontmatter, html } } = data;
  const { prev, next } = pageContext;
  const {
    title,
    date,
    display_date,
    time,
    tags,
    zoom,
    url,
    forum_post,
    registration_required,
    flyer,
    speakerImage,
    seo,
    location
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

  const past = dateString > eventDate
  
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
          past && <PastEventAlert forum_post={forum_post}/>
        }
          <EventMetadataWrapper>
            <EventInfo
                  date={date}
                  display_date={display_date}
                  time={time}
                  url={zoom ? zoom.url : url}
                  tags={tags}
                  registration_required={registration_required}
                  past={past}
                  location={location}
            />
          </EventMetadataWrapper>
          {( registration_required && !past && url) && (
            <div style={{ textAlign: "center", paddingTop: '2rem'}}>
              <ButtonCta href={url} target="_blank">
                Register Now!
              </ButtonCta>
            </div>
          )}

          <Module title="Event Details">
            {speakerImage && (
              <SpeakerImageWrapper>
                <SpeakerImage fluid={speakerImage.childImageSharp.fluid}/>
              </SpeakerImageWrapper>
            )}
            <div className="page-content" dangerouslySetInnerHTML={{ __html: html }} />
          </Module>

          {flyer && (
            <Link to={`${window.location.origin}${flyer.childImageSharp.fluid.src}`}>
              <Img 
                fluid={flyer.childImageSharp.fluid}
                style={{
                  margin: '0 auto',
                  width: '400px',
                  filter: 'drop-shadow(10px 10px 8px rgba(0, 0, 0, 0.1))'
                }}
              />
            </Link>
          )}

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
      html
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        display_date
        title
        time
        url
        forum_post
        tags
        registration_required
        location
        speakerImage {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }  
        }
        flyer {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }  
        }
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
