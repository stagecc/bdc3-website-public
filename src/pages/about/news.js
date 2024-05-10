import React from "react";
import styled from "styled-components";
import { Link } from "../../components/link";
import { PageContent } from "../../components/layout";
import { Title, Paragraph } from "../../components/typography";
import { SEO } from "../../components/seo";
import { NewsCard, CardHeader, CardBody } from "../../components/card";
import { Container as Grid, Row, Col } from "react-grid-system";
import newsCoverage from '../../data/newsCoverage.json'

const NewsPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="News Coverage" description="" keywords="" />

    <Title>News Coverage</Title>

    <Paragraph>
      View recent news and media coverage for BDC.
    </Paragraph>

    <Grid style={{maxWidth: '1200px'}}>
      <Row gutterWidth={ 32 } justify="start" style={{ marginLeft: '-32px', marginRight: '-32px'}}>
        {
          newsCoverage && newsCoverage.map((newsItem) => {
            return (
              <Col xs={ 12 } lg={ 4 } style={{ marginBottom: '32px' }}>
                <NewsCard newsItem={newsItem} noIcon/>
              </Col>
            )
          })
        }
      </Row>
    </Grid>
  </PageContent>
);

export default NewsPage;
