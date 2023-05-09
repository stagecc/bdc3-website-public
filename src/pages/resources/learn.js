import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Paragraph } from "../../components/typography";
import { Container as Grid, Row, Col } from "react-grid-system";
import { ResourceCard } from "../../components/card";
import { BulletedList, ListItem } from "../../components/list";
import { Link } from "../../components/link";
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
