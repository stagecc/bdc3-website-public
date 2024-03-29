import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Paragraph } from "../../components/typography";
import { Container as Grid, Row, Col } from "react-grid-system";
import { ResourceCard } from "../../components/card";
import { BulletedList, ListItem } from "../../components/list";
import { Link } from "../../components/link";
import {
  BlogIcon,
  CommunityIcon,
  DocumentsIcon,
  EventsIcon,
  FaqsIcon,
  VideosIcon
} from "../../components/icons";

const resources = [
  {
    title: "Documentation",
    icon: <DocumentsIcon size={52} fill="#fff" />,
    description:
      "Find step-by-step instructions on how to use BDC services and tools.",
    links: [
      {
        text: "BDC Documentation",
        url: "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/"
      },
      {
        text: "BDC Release Notes",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/release-notes"
      },
      {
        text: "Gen3 Documentation",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/explore_data/gen3-discovering-data"
      },
      {
        text: "PIC-SURE Documentation",
        url: 
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/explore-available-data/pic-sure-for-biodata-catalyst-user-guide"
      },
      {
        text: "Seven Bridges Documentation",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/seven-bridges"
      },
      {
        text: "Terra Documentation",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/terra"
      }
    ]
  },
  {
    title: "Videos",
    icon: <VideosIcon size={42} fill="#fff" />,
    description: "BDC webinars, workshops, and how to videos.",
    links: [
      {
        text: "BDC Demonstration (1:02:53)",
        url: "https://videocast.nih.gov/watch=37703"
      },
      {
        text: "BDC Videos",
        url: "https://www.youtube.com/channel/UCGkmY5oNK8uFZzT8vV_9KgQ"
      },
      {
        text: "Gen3 Videos",
        url: "https://gen3.org/community/webinars/"
      },
      {
        text: "PIC-SURE Videos",
        url: "https://www.youtube.com/watch?v=KQha_vZDgVc&list=PLJ6YccH8TEufZ5L-ctxzFF7vuZRLVacKw"
      },
      {
        text: "Seven Bridges",
        url: "https://www.sevenbridges.com/webinars/"
      },
      {
        text: "Terra Videos",
        url: "https://www.youtube.com/channel/UCkXAqpR5Hk1ZmNd2-1K2l5Q"
      }
    ]
  },
  {
    title: "FAQs",
    icon: <FaqsIcon size={42} fill="#fff" />,
    description:
      "Find answers to frequently asked questions from BDC users",
    links: [
      {
        text: "BDC FAQs",
        url: "https://bdcatalyst.freshdesk.com/support/solutions"
      },
      {
        text: "Gen3 FAQs",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/explore_data/gen3-discovering-data"
      },
      {
        text: "PIC-SURE FAQs",
        url: 
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/explore-available-data/pic-sure-for-biodata-catalyst-user-guide",
      },
    ]
  },
  {
    title: "Community Forums",
    icon: <CommunityIcon size={42} fill="#fff" />,
    description:
      "Connect with others using BDC and learn how they are using it.",
    links: [
      {
        text: "BDC Forum",
        url: "https://bdcatalyst.freshdesk.com/support/discussions/60000024585"
      },
      {
        text: "Gen3 Forum",
        url: "https://forums.gen3.org/"
      },
      {
        text: "Terra Forum",
        url: "https://support.terra.bio/hc/en-us/community/topics"
      }
    ]
  },
  {
    title: "Blogs & Tutorials",
    icon: <BlogIcon size={42} fill="#fff" />,
    description:
      "Learn about how BDC is evolving and how to use the system from the community.",
    links: [
      {
        text: "PIC-SURE Tutorials",
        url: 
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/explore-available-data/pic-sure-for-biodata-catalyst-user-guide/data-analysis-using-the-pic-sure-api"
      },
      {
        text: "Seven Bridges Blog",
        url: "https://www.sevenbridges.com/blog/"
      },
      {
        text: "Seven Bridges Tutorials",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/tutorials-videos-and-modules/seven-bridges-tutorials"
      },
      {
        text: "Terra Tutorials",
        url:
          "https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/tutorials-videos-and-modules/terra-tutorials"
      },
      {
        text: "Terra Blog",
        url: "https://terra.bio/blog/"
      },
      {
        text: "Terra Release Notes & Service Notifications",
        url: "https://support.terra.bio/hc/en-us/categories/360000693572"
      }
    ]
  },
  {
    title: "Upcoming Events",
    icon: <EventsIcon size={42} fill="#fff" />,
    description: "Find upcoming BDC events or view the archive.",
    links: [
      {
        text: "Gen3 Announcements",
        url: "https://forums.gen3.org/c/announcements/6"
      },
      {
        text: "Terra Community Events",
        url: "https://support.terra.bio/hc/en-us/categories/360001430891"
      }
    ]
  }
];

const LearnPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Learn" description="" keywords="" />

    <Title>Learn and Support</Title>

    <Paragraph>
      BDC is an ecosystem made up of many platforms and
      partners that support our researchers.
    </Paragraph>

    <Paragraph>
      Get started on the BDC ecosystem with this collection of
      documentation, videos, FAQs, community forums, tutorials, blog posts,
      upcoming events, and more from our ecosystem partners.
    </Paragraph>

    <Paragraph>
      Alternatively,{" "}
      <Link to="/docs">search documentation across our entire ecosystem</Link>.
    </Paragraph>

    <Paragraph>
      For more immediate assistance, contact our{" "}
      <Link to="/contact">help desk</Link>.
    </Paragraph>

    <Grid fluid>
      <Row>
        {resources.map(resource => (
          <Col
            key={resource.title}
            xs={12}
            md={6}
            xl={4}
            style={{ margin: "3rem 0" }}
          >
            <ResourceCard title={resource.title} icon={resource.icon || "ICON"}>
              <Paragraph>{resource.description}</Paragraph>
              <BulletedList>
                {resource.links.map(link => (
                  <ListItem
                    key={link.text}
                    primary={
                      <Link to={link.url}>{link.text}</Link>
                    }
                  />
                ))}
              </BulletedList>
            </ResourceCard>
          </Col>
        ))}
      </Row>
    </Grid>
  </PageContent>
);

export default LearnPage;