import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Paragraph, Heading, Subheading } from "../../components/typography";
import { Container as ReactGrid, Row, Col } from "react-grid-system";
import { ResourceCard } from "../../components/card";
import { Link } from "../../components/link";
import { Markdown } from "../../components/markdown"
import { ButtonLink } from "../../components/buttons"
import { Module } from "../../components/layout";
import { HorizontalRule } from "../../components/horizontal-rule"
import { Grid } from '@mui/material'
import {
  DocumentsIcon,
  EstimateIcon,
  HelpDeskIcon,
  JoinIcon,
  MicroscopeIcon,
  UserIcon
} from "../../components/icons";

const quickStart = [
  {
    title: "Get Started on BDC",
    icon: <UserIcon size={52} fill="#fff" />,
    description:
      "Learn about the accounts and permissions you need to access BDC, as well as data access and exploration, and how to apply for pilot funds.",
    buttonLink: {
      text: "Get Started",
      url:
        "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/terra"
    }
  },
  {
    title: "Conduct a Feasibility Study",
    icon: <EstimateIcon size={42} fill="#fff" />,
    description: "A feasibility study is often conducted as an initial exploration to determine the viability of the project plan.",
    buttonLink: {
      text: "Set up a Feasability Study",
      url: "https://videocast.nih.gov/watch=37703"
    }
  },
  {
    title: "Run a GWAS with NHLBI Hosted Datasets",
    icon: <MicroscopeIcon size={42} fill="#fff" />,
    description:
      "Use *BDC Powered by Seven Bridges* to perform a GWAS using either NHLBI hosted datasets or your own data.",
    buttonLink: {
      text: "Run a GWAS",
      url: "https://bdcatalyst.freshdesk.com/support/solutions"
    }
  }
];

const moreAnswers = [
  {
    title: "Documentation",
    icon: <DocumentsIcon size={52} fill="#fff" />,
    description:
      "View BDC docs",
    buttonLink: {
      text: "BDC Forum",
      url: "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/"
    }
  },
  {
    title: "Forum",
    icon: <JoinIcon size={42} fill="#fff" />,
    description:
      "Learn about how BDC is evolving and how to use the system from the community.",
    buttonLink: {
      text: "PIC-SURE Tutorials",
      url: 
        "https://bdcatalyst.freshdesk.com/support/discussions"
    }
  },
  {
    title: "Ask a Question",
    icon: <HelpDeskIcon size={62} fill="#fff" />,
    description: "Find upcoming BDC events or view the archive.",
    buttonLink: {
      text: "Dockstore News & Events",
      url: "https://biodatacatalyst.nhlbi.nih.gov/contact"
    }
  }
]

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

const LearnPage = ({data}) => {
  const todaysDate = new Date();

  const events = data.events.edges.filter(
    ({ node }) => new Date(node.frontmatter.date) >= todaysDate
  );

  return (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Learn" description="" keywords="" />

    <Title>Education and Support</Title>

    <Heading center>Engagement Pathways</Heading>
    <Subheading center>Quick Start on BDC</Subheading>
    <Paragraph center>Download one or all of our quick start guides to get started on BDC.</Paragraph>
    
    <ReactGrid fluid>
      <Row>
        {quickStart.map(resource => (
          <Col
            key={resource.title}
            xs={12}
            md={6}
            xl={4}
            style={{ margin: "3rem 0" }}
          >
            <ResourceCard title={resource.title} icon={resource.icon || "ICON"}>
              <Markdown src={resource.description}/>
              <ButtonLink to={resource.buttonLink.url}>{resource.buttonLink.text}</ButtonLink>
            </ResourceCard>
          </Col>
        ))}
      </Row>
    </ReactGrid>

    <Subheading center>Training Events</Subheading>
    <p>Next Event:</p>
    <EventsList events={events} />
    <ButtonLink to="/about/events/" style={{margin: 'auto'}}>See All Upcoming Events</ButtonLink>
    
    <Heading center>Find More Answers</Heading>
    <Paragraph center>View documentation, connect with others on the community forum, browse BDC Community Hours materials, or get in touch with a BDC representative.</Paragraph>

    <ReactGrid fluid>
      <Row>
        {moreAnswers.map(resource => (
          <Col
            key={resource.title}
            xs={12}
            md={6}
            xl={4}
            style={{ margin: "3rem 0" }}
          >
            <ResourceCard title={resource.title} icon={resource.icon || "ICON"}>
              <Markdown src={resource.description}/>
              <ButtonLink to={resource.buttonLink.url}>{resource.buttonLink.text}</ButtonLink>
            </ResourceCard>
          </Col>
        ))}
      </Row>
    </ReactGrid>
    
  </PageContent>
);
}
export default LearnPage;

export const query = graphql`
  query {
    events: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/events/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
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
