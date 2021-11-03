import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Subheading, Paragraph } from "../../components/typography";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { Card, CardHeader, CardBody } from "../../components/card";
import { ExternalLink } from "../../components/link";
import { usePlatforms } from "../../hooks";

const ToolLinks = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
  background-color: #eee;
`;

const InternalToolLink = styled(Link)`
  margin: 0 0.5rem;
`;

const ExternalToolLink = styled(ExternalLink)`
  margin: 0 0.5rem;
  white-space: nowrap;
`;

const Separator = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  ${props => props.horizontal && `margin: 1rem 0;`}
  &::after {
    content: "";
    position: absolute;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    opacity: 0.25;
    ${props =>
      props.horizontal &&
      `
        top: 0%;
        height: 1px;
        width: 100%;
        border-bottom: 1px solid var(--color-lightgrey);
      `}
    ${props =>
      props.vertical &&
      `
        top: 50%;
        height: 85%;
        width: 1px;
        border-left: 1px solid var(--color-lightgrey);
      `}
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ServicesPage = ({ data }) => {
  const platforms = usePlatforms();

  const sections = [
    {
      title: "Explore Available Data",
      platforms: [
        platforms.find(platform => platform.frontmatter.title === "Gen3"),
        platforms.find(platform => platform.frontmatter.title === "PIC-SURE"),
        platforms.find(platform => platform.frontmatter.title === "Dug"),
      ],
    },
    {
      title: "Analyze Data in Cloud-based Shared Workspaces",
      platforms: [
        platforms.find(platform => platform.frontmatter.title === "Seven Bridges"),
        platforms.find(platform => platform.frontmatter.title === "Terra"),
      ],
    },
    {
      title: "Use Community Tools on Controlled-access Datasets",
      platforms: [
        platforms.find(platform => platform.frontmatter.title === "Dockstore"),
        platforms.find(platform => platform.frontmatter.title === "HeLx"),
      ],
    }
  ];

  console.log(sections)

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="Platforms & Services" description="" keywords="" />

      <Title>Platforms and Services</Title>

      <br />

      <Heading center style={{ fontSize: '175%' }}>What Do You Want to Do Today?</Heading>
      <br />
      <br />

      {sections.map((section, i) => (
        <section>
          <Subheading>{section.title}</Subheading>
          <Grid fluid>
            <Row gutterWidth={ 32 } justify="center">
              {section.platforms.map(platform => (
                <Col xs={ 12 } lg={ 6 } style={{ marginBottom: '32px' }}>
                  <Card>
                    <CardHeader>{platform.frontmatter.serviceTitle}</CardHeader>
                    <CardBody style={{ flex: 1 }}>
                      <Paragraph>{platform.frontmatter.service}</Paragraph>
                    </CardBody>
                    <ToolLinks>
                      {platform.frontmatter.links.launch && (
                        <ExternalToolLink
                          to={platform.frontmatter.links.launch}
                          aria-label={`Launch ${platform.frontmatter.title}`}
                        >
                          Launch
                        </ExternalToolLink>
                      )}
                      {platform.frontmatter.links.launch && "|"}
                      {platform.frontmatter.links.documentation && (
                        <ExternalToolLink
                          to={platform.frontmatter.links.documentation}
                          aria-label={`View ${platform.frontmatter.title} documentation`}
                        >
                          Documentation
                        </ExternalToolLink>
                      )}
                      {platform.frontmatter.links.documentation && "|"}
                      <InternalToolLink
                        to={platform.frontmatter.path}
                        aria-label={`Learn more about ${platform.frontmatter.title}`}
                      >
                        Learn
                      </InternalToolLink>
                    </ToolLinks>
                  </Card>
                </Col>
              ))}
            </Row>
          </Grid>
          <br />
        </section>
      ))}

      <section>
        <Heading>Imputation Server</Heading>
        <Card>
          <CardHeader>Access the Imputation Server</CardHeader>
          <CardBody>
            <h3 style={{ textAlign: "center" }}>
              {" "}
              Imputation Server developed by the University of Michigan
            </h3>
            <Paragraph>
              Upload your own phased or unphased GWAS genotypes to the server
              and receive phased and imputed genomes in return. The server
              offers imputation from various reference panels including the
              TOPMed reference panel.
            </Paragraph>
            <ToolLinks>
              <ExternalToolLink
                to="https://imputation.biodatacatalyst.nhlbi.nih.gov/"
                aria-label="Launch imputation server"
              >
                Launch
              </ExternalToolLink>
              |
              <ExternalToolLink
                to="https://imputationserver.readthedocs.io/en/latest/"
                aria-label="View imputation server documentation"
              >
                Documentation
              </ExternalToolLink>
            </ToolLinks>
          </CardBody>
        </Card>
      </section>
    </PageContent>
  );
};

export default ServicesPage;
