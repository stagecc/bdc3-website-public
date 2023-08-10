import React from "react";
import { PageContent } from "../components/layout";
import { Title } from "../components/typography";
import { SEO } from "../components/seo";
import { Results, SearchForm } from '../components/search'

const SearchPage = ({ location }) => {

  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title="Semantic Search"
        description="BioData Catalyst semantic search provided by Dug"
      />

      <Title>Semantic Search</Title>

      <SearchForm />

      <Results />

    </PageContent>
  );
}

export default SearchPage;
