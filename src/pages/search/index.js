import React from "react";
import { navigate } from 'gatsby'
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { BookmarkBorder as CartIcon } from "@mui/icons-material";
import { PageContent } from "../../components/layout";
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
        mb: '2rem',
        '.cart-button': {
          position: 'absolute',
          right: 0,
          top: 2,
        },
      }}>
        <Typography variant="h1">Semantic Search</Typography>

        <IconButton className="cart-button" onClick={ () => navigate('/search/collection') }>
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
