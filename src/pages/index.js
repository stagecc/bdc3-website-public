import React from "react";
import { SEO } from "../components/seo";
import { Paragraph } from "../components/typography";
import { Card, CardHeader, CardBody } from "../components/card";
import { PageContent, Container } from "../components/layout";
import { Carousel } from "../components/carousel";
import { HexMenu } from "../components/menus";
import { BulletedList, ListItem } from "../components/list";
import { Hidden } from "react-grid-system";
import SickleCellImage from "../images/sickle-cell.jpg";
import BlurChartCheckUpCurve from "../images/blur-chart-check-up-curve.jpg";
import { NewsFeedModule } from "../components/modules";
import carouselData from "../data/data-carousel.json"
import { VideoPlayer } from "../components/video-player"
import { DugForm } from "../components/search"
import { Link } from "../components/link"

const IndexPage = () => {
  return (
    <PageContent>
      <SEO title="Home" description="" keywords="" />

      <Carousel panels={ carouselData } />

      <Container
        width="90%"
        maxWidth="1200px"
        center
        style={{ marginTop: "0" }}
      >
        <Hidden xs sm md>
          <HexMenu />
        </Hidden>

        <br />

        <DugForm />
        
        <Paragraph center style={{ fontStyle: 'italic', fontSize: '90%' }}>
          Learn more about <Link to="#">BDC Semantic Search</Link>. 
        </Paragraph>

        <br /><br />

        <Card>
          <CardHeader size="large">What is NHLBI BioData Catalyst<sup>®</sup>&nbsp;(BDC)?</CardHeader>
          <CardBody>
            <Paragraph>
              NHLBI BioData Catalyst<sup>®</sup> (BDC) is a cloud-based ecosystem that
              offers researchers data, analytic tools, applications, and
              workflows in secure workspaces. It is a community where
              researchers can find, access, share, store, and analyze heart,
              lung, blood, and sleep data resources. And it is one of NHLBI’s
              data repositories, where researchers share scientific data from
              NHLBI-funded research so they and others can reproduce findings
              and reuse data to advance science. By increasing access to NHLBI
              data and innovative analytic capabilities, BDC accelerates
              reproducible biomedical research to drive scientific advances
              that can help prevent, diagnose, and treat heart, lung, blood,
              and sleep disorders.
            </Paragraph>
          </CardBody>
          <CardBody>
            <VideoPlayer url="https://youtu.be/enWIpA0aJb4" controls={ true } />
          </CardBody>
        </Card>

        <Card>
          <CardHeader size="large">Latest Updates</CardHeader>
          <CardBody image={{ placement: "left", path: BlurChartCheckUpCurve }}>
            <NewsFeedModule />
          </CardBody>
        </Card>
      </Container>
    </PageContent>
  );
};

export default IndexPage;
