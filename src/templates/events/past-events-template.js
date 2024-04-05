import React, { Fragment } from "react";
// import { AnimateOnMount } from "../../components/anim";
import { graphql } from "gatsby";
import { Link } from "../../components/link";
import { SEO } from "../../components/seo";
import { Title, Paragraph, Meta } from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import { Container as Grid, Row, Col } from "react-grid-system";
import { Module, PageContent } from "../../components/layout";
import { EventsList } from "../../components/events/past-event-list-grid"
import Avatar from '@mui/material/Avatar';
import BDCLogo from '../../images/favicon.png'

export default ({ data, pageContext }) => {
  const events = data.events.edges;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Past RENCI Events"
        description="Read about upcoming events that are related to RENCI and the RENCI team, inclusing conferences, workshops, and meet-ups."
        keywords={[
          "events",
          "conferences",
          "meet-ups",
          "workshops",
          "presentations",
          "hackathon",
        ]}
      />
      <SEO title="Events" />

      <Title>Event Archive</Title>

      <Module>
        <Paragraph>
          The following are past events supported by the BDC ecosystem. Items denoted with a <Avatar 
            src={BDCLogo} 
            alt='BDC logo' 
            component="span" 
            sx={{
              width: 20, height: 20,
              border: '1px solid #c5cfe8',
              display: 'inline-block',
              margin: '0 0.2rem'
            }}/> {" "}indicate events hosted by BDC.
        </Paragraph>

        <EventsList events={events} />
      </Module>

      <Paragraph center>
        <ButtonLink primary={true} to="/about/events">
          View our upcoming events
        </ButtonLink>
      </Paragraph>
    </PageContent>
  );
};

export const allEventsQuery = graphql`
  query($todaysDate: Date!) {
    events: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/events/" }
        frontmatter: { date: { lt: $todaysDate } }
      }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMM D, YYYY")
            display_date
            path
            title
            url
            time
            location
            forum_post
            externalEvent
          }
        }
      }
    }
  }
`;
