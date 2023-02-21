import React, { Fragment } from "react";
import Img from "gatsby-image";
import { SEO } from "../../components/seo";
import styled from "styled-components";
import { PageContent } from "../../components/layout";
import {
  Title,
  Heading,
  Subheading,
  Paragraph,
} from "../../components/typography";
import { List, ListItem } from "../../components/list";
import { Link } from "../../components/link";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { usePartners, usePlatforms } from "../../hooks";
import { navigate } from "gatsby";

const LogoCloud = styled.div`
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  &:before { 
    content: "";
    display: block; 
    position: relative;
    width: 0;
    height: 120px;
    margin-top: -120px;
  }

  &:first-of-type {
    margin-top: -140px;
  }
`

const PlatformImage = styled(Img)`
  margin: 2rem;
`;

const AboutPage = ({ data }) => {
  const partners = usePartners().sort((p, q) => p.name > q.name);
  const platforms = usePlatforms().map(
    ({ frontmatter: { title, path, logo } }) => ({ title, path, logo })
  );

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="About BioData Catalyst" description="" keywords="" />

      <Grid fluid>
        <Row>
          <Visible lg xl>
            <Col lg={3}>
              <List
                style={{
                  position: "sticky",
                  top: "16rem",
                  paddingRight: "2rem",
                }}
                right
              >
                <ListItem
                  primary={
                    <a href="#what-we-offer" onClick={() => navigate("#what-we-offer")}>
                      What we Offer
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#who-we-are" onClick={() => navigate("#who-we-are")}>
                      Who we Are
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#contributing" onClick={() => navigate("#contributing")}>
                      Contribute
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#data-protection" onClick={() => navigate("#data-protection")}>
                      Data Protection
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#citation" onClick={() => navigate("#citation")}>
                      Citation
                    </a>
                  }
                />
              </List>
            </Col>
          </Visible>
          <Col xs={12} lg={9}>
            <Title>About NHLBI BioData Catalyst® (BDC)</Title>

            <Section id="what-we-offer">
              <Heading>What We Offer</Heading>

              <Paragraph>
                For research investigators who need to find, access, share,
                store, and compute on large scale datasets, BDC serves as a 
                cloud-based ecosystem providing tools, applications, and 
                workflows to enable these capabilities in secure workspaces.
              </Paragraph>

              <Paragraph>
                BDC increases access to NHLBI datasets and innovative data 
                analysis capabilities and accelerates efficient biomedical 
                research that drives discovery and scientific advancement, 
                leading to novel diagnostic tools, therapeutic options, and 
                prevention strategies for heart, lung, blood, and sleep 
                disorders.
              </Paragraph>
            </Section>

            <br />

            <Section id="who-we-are">
              <Heading>Who We Are</Heading>

              <Paragraph>
                Though the primary goal of the BDC project is to build a data 
                science ecosystem, at its core, this is a people-centric 
                endeavor. BDC is also building a community of practice working 
                to collaboratively solve technical and scientific challenges.
              </Paragraph>

              <Paragraph>
                The BDC ecosystem is funded by the National Heart, Lung, and 
                Blood Institute (NHLBI). It is designed to be nimble and 
                responsive to the ever-changing conditions of the data and 
                biomedical science community.
              </Paragraph>

              <Subheading>Partners Powering Our Ecosystem</Subheading>

              <Paragraph>
                Researchers and other professionals from the following
                institutions have received funding from NHLBI to work on the
                BDC ecosystem:
              </Paragraph>

              <List dense>
                {partners.map((partner) => (
                  <ListItem key={partner.name} primary={partner.name} />
                ))}
              </List>

              <Subheading>Platforms Powering Our Ecosystem</Subheading>

              <LogoCloud>
                {platforms.map((platform) => (
                  <Link
                    key={platform.title}
                    to={platform.path}
                    syle={{ width: "100%" }}
                  >
                    <PlatformImage
                      fixed={platform.logo.childImageSharp.fixed}
                      alt={`View details about ${platform.title.replace(
                        "-",
                        " "
                      )}`}
                    />
                  </Link>
                ))}
              </LogoCloud>

              <Subheading>NIH Cloud Ecosystem Collaborations</Subheading>

              <Paragraph>
                BDC partners with others in the cloud computing domain to 
                help build our community of practice and accelerate progress 
                in the data and biomedical community. Current partners are:
              </Paragraph>

              <List>
                <ListItem
                  primary={
                    <Fragment>
                      <Link to="https://anvilproject.org/ncpi">
                        NCPI
                      </Link>{" "}
                      &ndash; The NIH Cloud Platform Interoperability Effort
                      (NCPI) is establishing and implementing guidelines and
                      technical standards to empower end-user analyses across
                      participating platforms and facilitate the realization of
                      a trans-NIH, federated data ecosystem. BDC is participating 
                      in the NCPI - along with AnVIL, the Cancer Research Data 
                      Commons, and the Kids First Data Resource Center - to 
                      enable cross-platform data sharing and analysis.
                    </Fragment>
                  }
                />
                <ListItem
                  primary={
                    <Fragment>
                      <Link to="https://datascience.nih.gov/strides">
                        STRIDES
                      </Link>{" "}
                      &ndash; The NIH Science and Technology Research
                      Infrastructure for Discovery, Experimentation, and
                      Sustainability (STRIDES) Initiative allows NIH to provide
                      cost-effective access to industry-leading partners to help
                      advance biomedical research. These partnerships enable
                      access to rich datasets and advanced computational
                      infrastructure, tools, and services. BDC leverages STRIDES 
                      to enhance efficiency of data storage and computation.
                    </Fragment>
                  }
                />
                <ListItem
                  primary={
                    <Fragment>
                      <Link to="https://datascience.nih.gov/data-infrastructure">
                        ODSS
                      </Link>{" "}
                      &ndash; The NIH Office of Data Science Strategy (ODSS)
                      supports efficient and effective biomedical research data
                      infrastructure to achieve NIH’s mission of applying
                      knowledge gained through research to improve health. BDC 
                      works with ODSS to facilitate secure data storage and 
                      broad access to biomedical datasets.
                    </Fragment>
                  }
                />
              </List>
            </Section>

            <br />

            <Section id="contributing">
              <Heading>Contribute to the BDC Ecosystem</Heading>

              <Paragraph>
              BDC is a dynamic ecosystem that gets continually developed and 
              enhanced, and the BDC Consortium encourages the community to 
              provide resources, insights, and suggestions. There are multiple 
              ways to contribute:
              </Paragraph>

              <ol style={{ lineHeight: 2 }}>
                <li>
                  Learn how to{" "}
                    <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/community/contributing-user-resources-to-bdc">
                      Contribute User Resources to BDC
                    </Link>{" "}
                  like written documentation, videos, and responses to inquiries
                </li>
                <li>
                  Use the BDC{" "}
                    <Link to="https://biodatacatalyst.nhlbi.nih.gov/contact">
                      Contact Form
                    </Link>{" "}
                  to provide feedback about enhancements you'd like to see
                </li>
                <li>
                  Respond to periodic{" "}
                    <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/community/request-for-comments">
                      Requests for Comment (RFC) solicitations
                    </Link>
                </li>
              </ol>
            </Section>

            <br />

            <Section id="data-protection">
              <Heading>Data Protection</Heading>

              <Paragraph>
                The BDC ecosystem responsibly stewards access to hosted datasets, 
                requires researchers bringing their own data to respect and 
                protect the interests of research participants, and takes measures 
                to secure the BDC ecosystem.{" "}
                <Link to="/data-protection">
                  Read more about how we do this
                </Link>
                .
              </Paragraph>
            </Section>

            <br />

            <Section id="citation">
              <Heading>How to Cite Us</Heading>

              <Paragraph>
                To learn more about citing and acknowledging BDC,{" "}
                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/biodata-catalyst-glossary/citation-and-acknowledgement">
                  visit our documentation
                </Link>
                .
              </Paragraph>
            </Section>
          </Col>
        </Row>
      </Grid>
    </PageContent>
  );
};

export default AboutPage;
