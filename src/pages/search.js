import React from "react";
import { PageContent } from "../components/layout";
import { Title } from "../components/typography";
import { SEO } from "../components/seo";
import { SearchForm, Results, useSearch } from '../components/search'

const SearchPage = ({ location }) => {
  const { query } = useSearch()

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Semantic Search"
        description="semantic search provided by Dug"
      />

      <Title>Semantic Search ({ query })</Title>

      <SearchForm />

      <Results />

    </PageContent>
  );
}

export default SearchPage;
