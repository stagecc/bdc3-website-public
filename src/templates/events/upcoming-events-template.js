import React, { Fragment } from "react";
import { graphql } from "gatsby";
// import { AnimateOnMount } from "../../components/anim";
import { SEO } from "../../components/seo";
import {
  Title,
  Paragraph,
  Subheading,
  // Meta,
} from "../../components/typography";
import { Link } from "../../components/link";
import { ButtonLink } from "../../components/buttons";
import { Module, PageContent } from "../../components/layout";
import { HorizontalRule } from "../../components/horizontal-rule"
// import { LinkIcon } from "../../components/icons";
// import { useWindowWidth } from "../../hooks";
import { Grid } from '@mui/material'

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
              <Grid container spacing={2}>
                <Grid item sm={12} md={3}>
                  <Paragraph left noMargin>
                    {display_date ? display_date : date}
                  </Paragraph>
                </Grid>
                <Grid item sm={12} md={9}>
                  <Subheading left>
                    <Link 
                      to={path}
                    >{title}</Link>
                  </Subheading>
                  <Paragraph style={{fontSize: '85%'}}>{excerpt} <Link to={path}>
                    Read More
                    </Link>
                  </Paragraph>
                </Grid>
              </Grid>
              <HorizontalRule />
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
        The following is a list of upcoming events supported by the BDC ecosystem.
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
