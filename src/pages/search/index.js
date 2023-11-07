import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { PageContent } from "../../components/layout";
import { SEO } from "../../components/seo";
import { CheckoutCta, CollectionPreview, DugForm, FiltersTray, Results, Sidebar, useSearch } from "../../components/search";

const SearchPage = ({ location }) => {
  const {  query } = useSearch()

  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title={ `Semantic Search - "${ query }"` }
        description="BioData Catalyst semantic search provided by Dug"
      />

      <Typography variant="h1">Semantic Search</Typography>

      <Grid container spacing={ 4 }>
        <Grid item xs={ 12 } md={ 8 } lg={ 9 }>
          <Stack>
            <DugForm focusOnMount slashFocus />
            <FiltersTray />
            <Results />
          </Stack>
        </Grid>

        <Grid item xs={ 12 } md={ 4 } lg={ 3 } sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <Sidebar>
            <CollectionPreview />
            <CheckoutCta />
          </Sidebar>
        </Grid>
      </Grid>

    </PageContent>
  );
}

export default SearchPage;

