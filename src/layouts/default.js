import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import {
  Header,
  Brand,
  Main,
  Footer,
  Subfooter,
  Container,
  StickyWrapper,
  LineBreak
} from "../components/layout";
import { Paragraph } from "../components/typography";
import { Menu, MobileMenu } from "../components/menus";
import { menuItems } from "../data/menu";
import { List, ListItem } from "../components/list";
import { useScrollPosition, useWindowWidth } from "../hooks";
import hexBackgroundLeftSvg from "../images/hex-background-left.svg";
import hexBackgroundRightSvg from "../images/hex-background-right.svg";
import { ExternalLink } from "../components/link";
import { logLogo } from "../utils";
import { Banner } from "../components/banner";

import "../styles/normalize.css";
import "../styles/customize.css";

const LayoutWrapper = styled.div(
  ({ compact }) => `
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  &::after {
    content: "";
    left: 0;
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -2;
    ${
      compact
        ? `
        background-image: url(${hexBackgroundLeftSvg});
        background-position: -4rem 0;
        background-size: 400px;
        background-repeat: repeat-y;
        background-attachment: fixed;
      `
        : `
        background-image: url(${hexBackgroundLeftSvg}), url(${hexBackgroundRightSvg});
        background-position: -4rem 0, calc(100% + 4rem) 0;
        background-size: 400px;
        background-repeat: repeat-y, repeat-y;
        background-attachment: fixed;
      `
    }
  }
`
);

const SkipLink = styled.a`
  display: block;
  position: absolute;
  background-color: var(--color-crimson);
  color: #eee;
  padding: 0.5rem;
  z-index: 999;
  transition: transform 250ms;
  transform: translateY(-100%);
  &:focus {
    transform: translateY(0%);
  }
`;

export const DefaultLayout = ({ children }) => {
  const { isCompact } = useWindowWidth();
  const scrollPosition = useScrollPosition();

  useEffect(() => logLogo(), []);

  return (
    typeof isCompact === "boolean" && (
      <LayoutWrapper compact={isCompact}>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <StickyWrapper stuck={true}>
          <Banner>
            <Paragraph style={{ margin: 0 }}>
              COVID-19 is an emerging, rapidly evolving situation. Get updated
              information on&nbsp;
              <Link to="/covid-19">
                COVID-19 data available on NHLBI BioData Catalyst
              </Link>
              .
            </Paragraph>
          </Banner>
          <Header>
            <Brand width="380px" compact={isCompact} />
            <Visible xs sm md>
              <MobileMenu items={menuItems} />
            </Visible>
            <Visible lg xl>
              <Menu items={menuItems} />
            </Visible>
          </Header>
        </StickyWrapper>
        <Main id="main-content">{children}</Main>
        <Footer>
          <Container width="95%" maxWidth="1080px" center>
            <Grid fluid>
              <Row>
                <Col xs={12} md={5} push={{ md: 7 }}>
                  <List center={isCompact} right={!isCompact}>
                    <ListItem primary={<Link to="/faqs">FAQs</Link>} />
                    <ListItem
                      primary={<Link to="/accessibility">Accessibility</Link>}
                    />
                    <ListItem
                      primary={<Link to="/privacy">Privacy Policy</Link>}
                    />
                    <ListItem
                      primary={
                        <Link to="/data-protection">Data Protection</Link>
                      }
                    />
                    <ListItem
                      primary={
                        <ExternalLink
                          lightIcon
                          to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/"
                        >
                          Documentation
                        </ExternalLink>
                      }
                    />
                    <ListItem
                      primary={
                        <ExternalLink
                          lightIcon
                          to="https://hhs.responsibledisclosure.com/hc/en-us"
                        >
                          HHS Vulnerability Disclosure
                        </ExternalLink>
                      }
                    />
                    <ListItem
                      primary={
                        <ExternalLink to="https://www.nhlbi.nih.gov/about/foia-fee-for-service-office">
                          Freedom of Information Act (FOIA)
                        </ExternalLink>
                      }
                    />
                  </List>
                </Col>
                <Col xs={12} md={7} pull={{ md: 5 }}>
                  <Paragraph center={isCompact} left={!isCompact}>
                    BioData Catalyst is a product of the National Heart, Lung,
                    and Blood Institute of the National Institutes of Health.
                    <LineBreak count={2} />
                    For general inquiries, <Link to="/contact">contact us</Link>
                    .
                    <LineBreak count={2} />
                    &copy; {new Date().getFullYear()}
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col xs={12} style={{ textAlign: "center" }}>
                  <strong style={{ textTransform: "uppercase" }}>
                    <ExternalLink
                      lightIcon
                      to="http://www.biodatacatalyst.org/Security/login"
                    >
                      Consortium Member Portal
                    </ExternalLink>
                  </strong>
                </Col>
              </Row>
            </Grid>
          </Container>
        </Footer>
        <Subfooter compact={isCompact}>
          <ExternalLink to="https://www.hhs.gov/">
            U.S. Department of Health & Human Services
          </ExternalLink>
          <Visible md lg xl>
            <strong>&bull;</strong>
          </Visible>
          <ExternalLink to="https://www.nih.gov/">
            National Institutes of Health
          </ExternalLink>
          <Visible md lg xl>
            <strong>&bull;</strong>
          </Visible>
          <ExternalLink to="https://www.nhlbi.nih.gov/">
            National Heart, Lung, and Blood Institute
          </ExternalLink>
          <Visible md lg xl>
            <strong>&bull;</strong>
          </Visible>
          <ExternalLink to="https://www.usa.gov/">USA.gov</ExternalLink>
        </Subfooter>
      </LayoutWrapper>
    )
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};
