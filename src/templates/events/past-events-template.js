import React from "react";
// import { AnimateOnMount } from "../../components/anim";
import { graphql } from "gatsby";
import { Link } from "../../components/link";
import { SEO } from "../../components/seo";
import { Title, Paragraph, Meta } from "../../components/typography";
import { ButtonLink } from "../../components/buttons";
import { Container as Grid, Row, Col } from "react-grid-system";
import { Module, PageContent } from "../../components/layout";

const EventsList = ({ title, events }) => {
  return (
    <Module title={title}>
      <Grid fluid>
        {events.length ? (
          events.map((event) => {
            const {
              title,
              path,
              date,
              display_date,
              // fabricHosted,
            } = event.node.frontmatter;
            return (
              <Row key={title}>
                <Col xs={12} sm={3}>
                  <Meta>{display_date ? display_date : date}</Meta>
                </Col>
                <Col xs={12} sm={9}>
                  <h5 style={{ lineHeight: 1.5 }}>
                    <Link to={path}>{title}</Link>
                  </h5>
                </Col>
              </Row>
            );
          })
        ) : (
          <Paragraph center>
            There are no events to display at the moment. Please check back
            soon!
          </Paragraph>
        )}
      </Grid>
    </Module>
  );
};

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
          These are past events supported by the NHLBI BioData Catalyst
          Ecosystem.
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
            tags
          }
        }
      }
    }
  }
`;
