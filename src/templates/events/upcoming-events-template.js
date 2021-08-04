import React, { Fragment } from "react";
import { graphql, Link } from "gatsby";
// import { AnimateOnMount } from "../../components/anim";
import { SEO } from "../../components/seo";
import {
  Title,
  Paragraph,
  Heading,
  Subheading,
  Meta,
} from "../../components/typography";
import { ExternalLink } from "../../components/link";
import { ButtonLink } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
// import { LinkIcon } from "../../components/icons";
import { useWindowWidth } from "../../hooks";

const EventsList = ({ title, events }) => {
  const { isCompact } = useWindowWidth();
  console.log(events);
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
            url,
            fabricHosted,
          } = event.node.frontmatter;
          return (
            <Fragment key={title}>
              <Subheading>{display_date ? display_date : date}</Subheading>
              <Heading>
                <Link to={path}>{title}</Link>
                {fabricHosted ? "*" : null}
              </Heading>
              {!fabricHosted && url && (
                <Meta
                  style={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: isCompact ? "column" : "row",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Event Website:
                  </span>
                  <span>
                    <ExternalLink to={url}>{url}</ExternalLink>
                  </span>
                </Meta>
              )}
              <Paragraph
                style={{
                  borderLeft: "3px solid var(--color-lightgrey)",
                  paddingLeft: "1rem",
                }}
              >
                {excerpt} <br />
                <Link style={{ float: "right" }} to={path}>
                  Read More
                </Link>
              </Paragraph>
            </Fragment>
          );
        })
      ) : (
        <Paragraph center>
          There are no events to display at the moment. Please check back soon!
        </Paragraph>
      )}
      {events.length ? (
        <Meta right>
          <strong>*</strong> RENCI-hosted event
        </Meta>
      ) : null}
    </Module>
  );
};

export default ({ data, pageContext }) => {
  const events = data.events.edges;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Upcoming FABRIC Events"
        description="Come meet the FABRIC team in person! Read about upcoming events that are related to FABRIC and the FABRIC team, inclusing conferences, workshops, and meet-ups."
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
            fabricHosted
          }
          excerpt(pruneLength: 280)
        }
      }
    }
  }
`;
