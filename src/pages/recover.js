import React from "react";
import { SEO } from "../components/seo";
import { PageContent } from "../components/layout";
import { Title, Heading } from "../components/typography";
import { Link } from "../components/link";
import styled from "styled-components";
import { List, ListItem } from "../components/list";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { navigate } from "gatsby";

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

const RECOVERPage = () => {

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="RECOVER at BDC"/>

      <Title>RECOVER @ BDC</Title>

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
                    <a href="#about-recover-at-bdc" onClick={() => navigate("#about-recover-at-bdc")}>
                      About RECOVER
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#recover-data-in-bdc" onClick={() => navigate("#recover-data-in-bdc")}>
                      RECOVER Data in BDC
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#get-started-with-recover-data" onClick={() => navigate("#get-started-with-recover-data")}>
                      Get Started with RECOVER Data in BDC
                    </a>
                  }
                />
              </List>
            </Col>
          </Visible>
          <Col xs={12} lg={9}>
            <Section id="about-recover-at-bdc">
              <Heading>About RECOVER and its Research Community</Heading>

            </Section>

            <br />

            <Section id="recover-data-in-bdc">
              <Heading>RECOVER Data in BDC</Heading>

            </Section>

            <br />

            <Section id="get-started-with-recover-data">
              <Heading>Get Started with RECOVER Data in BDC</Heading>

            </Section>

          </Col>
        </Row>
      </Grid>

    </PageContent>
  )
}

export default RECOVERPage;