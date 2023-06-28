import React from "react";
import { PageContent } from "../../components/layout";
import { Title, Paragraph } from "../../components/typography";
import { SEO } from "../../components/seo";
import { NewsCard } from "../../components/card";
import { Container as Grid, Row, Col } from "react-grid-system";
import newsCoverage from '../../data/newsCoverage.json'

const NewsPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="News Coverage" description="" keywords="" />

    <Title>News Coverage</Title>

    <Paragraph>
      View recent news and media coverage for BDC.
    </Paragraph>

    <Grid>
      <Row gutterWidth={ 32 } justify="center">
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
