import React from "react";
import { Link } from "../../components/link";
import { PageContent } from "../../components/layout";
import { Title, Paragraph } from "../../components/typography";
import { SEO } from "../../components/seo";
import { Card, CardHeader, CardBody } from "../../components/card";
import { Container as Grid, Row, Col } from "react-grid-system";
import newsCoverage from '../../data/newsCoverage.json'


const NewsCardComponent = ({newsItem}) => {
  return (
    <Card style={{
      backgroundColor: "rgb(25, 48, 72)",
      justifyContent: "space-between"

    }}>
      <CardHeader style={{
      backgroundColor: "rgb(25, 48, 72)",
      justifyContent: "start",
        textAlign: "left",
        marginTop: "2rem", 
        lineHeight: "1.2", 
        letterSpacing: "0.5px"
      }}>
        {newsItem.newsTitle}
        </CardHeader>
      <CardBody style={{
      backgroundColor: "rgb(25, 48, 72)",
      color: "white"
    }}>
        <Paragraph style={{letterSpacing: "1px"}}>
        {newsItem.newsDate}
        </Paragraph>
      </CardBody>
    </Card>
  )
}


const NewsPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="News Coverage" description="" keywords="" />

    <Title>News Coverage</Title>

    <Paragraph>
      Blurb about featured articles
    </Paragraph>

    <Row gutterWidth={ 32 } justify="center">
      {
        newsCoverage && newsCoverage.map((newsItem) => {
          return (
            <Col xs={ 12 } lg={ 4 } style={{ marginBottom: '32px' }}>
              <NewsCardComponent newsItem={newsItem}/>
            </Col>
          )
        })
      }
    </Row>

  </PageContent>
);

export default NewsPage;
