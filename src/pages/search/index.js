import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { PageContent } from "../../components/layout";
import { SEO } from "../../components/seo";
import { CollectionPreview, DugForm, FiltersTray, Results, Sidebar } from "../../components/search";

const SearchPage = ({ location }) => {
  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title="Semantic Search"
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

        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
          <Sidebar>
            <CollectionPreview />
          </Sidebar>
        </Grid>
      </Grid>

    </PageContent>
  );
}

export default SearchPage;

