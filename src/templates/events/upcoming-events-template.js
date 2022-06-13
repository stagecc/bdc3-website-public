import React, { Fragment } from "react";
import { graphql } from "gatsby";
// import { AnimateOnMount } from "../../components/anim";
import { SEO } from "../../components/seo";
import {
  Title,
  Paragraph,
  Subheading,
  Subsubheading,
  // Meta,
} from "../../components/typography";
import { Link } from "../../components/link";
import { ButtonLink } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
// import { LinkIcon } from "../../components/icons";
// import { useWindowWidth } from "../../hooks";

const EventsList = ({ title, events }) => {
  // const { isCompact } = useWindowWidth();
  return (
    <Module title={title}>
      <br />
      {events.length ? (
        events.map((event) => {
          const { excerpt } = event.node;
          const {
            title,
            path,
            date,
            display_date,
          } = event.node.frontmatter;
          return (
            <Fragment key={title}>
              <Subsubheading 
                style={{
                  fontWeight: "500",
                  fontSize: "1rem",
                  margin: "0 0 0.5rem",
                }}
              >
                {display_date ? display_date : date}
              </Subsubheading>
              <Subheading 
                style={{
                  fontSize: "1.4rem",
                  margin: '0',
                  fontWeight: "600",
                  letterSpacing: "0.5px"
                }}
              >
                <Link 
                  to={path}
                  style={{
                    textUnderlineOffset: "0.3rem",
                    lineHeight: '1.7'
                  }}
                >{title}</Link>
              </Subheading>
              <Paragraph
                style={{
                  borderLeft: "3px solid var(--color-lightgrey)",
                  paddingLeft: "1rem",
                  lineHeight: "1.8",
                  fontSize: "0.8rem"
                }}
              >
                {excerpt} <Link to={path}>
                  Read More
                </Link>
              </Paragraph>
              <br/>
            </Fragment>
          );
        })
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
        See the list below of events supported by the NHLBI BioData Catalyst
        Ecosystem.
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
          }
          excerpt(pruneLength: 280)
        }
      }
    }
  }
`;
