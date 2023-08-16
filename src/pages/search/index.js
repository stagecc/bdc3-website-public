import React from "react";
import { Badge, Box, IconButton } from "@mui/material";
import { ShoppingCart as CartIcon } from "@mui/icons-material";
import { PageContent } from "../../components/layout";
import { Title } from "../../components/typography";
import { SEO } from "../../components/seo";
import { Results, SearchForm, useSearch } from "../../components/search";

const SearchPage = ({ location }) => {
  const { cart } = useSearch()

  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title="Semantic Search"
        description="BioData Catalyst semantic search provided by Dug"
      />

      <Box sx={{
        position: 'relative',
        '.cart-button': {
          position: 'absolute',
          right: 0,
          top: 2,
        },
      }}>
        <Title>Semantic Search</Title>
        <IconButton className="cart-button">
          <Badge badgeContent={ cart.count } color="primary">
            <CartIcon color="secondary" />
          </Badge>
        </IconButton>
      </Box>

      <SearchForm />

      <Results />

    </PageContent>
  );
}

export default SearchPage;
