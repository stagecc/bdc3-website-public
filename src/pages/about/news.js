import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title } from "../../components/typography";

const NewsPage = ({ data }) => {
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="BioData Catalyst News" description="" keywords="" />
      <Title>News</Title>

    </PageContent>
  );
};

export default NewsPage;
