import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { ExternalLink } from "../../components/link";
import { EcoSystemForm } from "../../components/form";
import { BulletedList, ListItem } from "../../components/list";

const NewsPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="News" description="News" keywords="News" />

    <Title>News</Title>
  </PageContent>
);

export default NewsPage;
