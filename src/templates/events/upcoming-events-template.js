import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { SEO } from "../../components/seo";
import {
  Title,
  Paragraph,
} from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
import { EventListPreview } from '../../components/events/upcoming-event-list-preview'
import { Avatar } from '@mui/material/';
import BDCLogo from '../../images/favicon.png'

const EventsList = ({ title, events }) => {
  // const { isCompact } = useWindowWidth();
  return (
    <Module title={title}>
      <br />
      {events.length ? (
        events.map((event) => (<EventListPreview event={event}/>)
        )
      ) : (
        <Paragraph center>
          There are no events to display at the moment. Please check back soon!
        </Paragraph>
      )}
    </Module>
  );
};

export default ({ data, pageContext }) => {
  const events = data.events.edges;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Upcoming Events"
        description="Come meet the BioData Catalyst team in person! Read about upcoming events that are related, inclusing conferences, workshops, and meet-ups."
        keywords={[
          "events",
          "conferences",
          "meet-ups",
          "workshops",
          "presentations",
          "hackathons",
        ]}
      />

      <Title>Upcoming Events</Title>

        <Paragraph>
          The following is a list of upcoming events supported by the BDC ecosystem. Items denoted with a <Avatar src={BDCLogo} sx={{
          width: 20, height: 20,
          border: '1px solid #c5cfe8',
          display: 'inline-block',
          margin: '0 0.2rem'
        }}/> {" "}indicate events hosted by BDC.
        </Paragraph>

      <EventsList events={events} />

      <Paragraph center>
        <ButtonLink primary={true} to="/about/events/archive">
          View our past events
        </ButtonLink>
      </Paragraph>
    </PageContent>
  );
};

export const allEventsQuery = graphql`
  query($todaysDate: Date!) {
    events: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: ASC }
      filter: {
        fileAbsolutePath: { regex: "/events/" }
        frontmatter: { date: { gt: $todaysDate } }
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
            externalEvent
          }
          excerpt(pruneLength: 280)
        }
      }
    }
  }
`;
