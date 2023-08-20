import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { PageContent } from "../../components/layout";
import { SEO } from "../../components/seo";
import { CollectionPreview, FiltersTray, Results, SearchForm } from "../../components/search";


const SearchPage = ({ location }) => {
  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title="Semantic Search"
        description="BioData Catalyst semantic search provided by Dug"
      />

      <Typography variant="h1">Semantic Search</Typography>

      <Stack gap={ 2 } sx={{ my: 2 }}>
        <SearchForm />
        <FiltersTray />
      </Stack>


      <Grid container spacing={ 4 }>
        <Grid item xs={ 12 } md={ 8 } lg={ 9 }>
          <Results />
        </Grid>

        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
          <Sidebar />
        </Grid>
      </Grid>

    </PageContent>
  );
}

export default SearchPage;

const Sidebar = () => {
  return (
    <Stack gap={ 4 } sx={{
      position: 'sticky',
      top: 140,
      '.MuiCardContent-root': { p: 0 },
      '.MuiListSubheader-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        lineHeight: '36px',
      },
    }}>
      <CollectionPreview />
    </Stack>
  )
}
