import React from 'react'
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { PageContent } from '../../components/layout'
import { SEO } from '../../components/seo'
import { Link } from '../../components/link'
import { useSearch } from '../../components/search'
import { DeleteIcon as EmptyCartIcon } from '../../components/icons'

const CartPage = () => {
  const { cart } = useSearch()

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="My Cart - Semantic Search"
        description="My Cart - BioData Catalyst semantic search provided by Dug"
      />


      <Box>
        <Typography variant="h1">Semantic Search: Cart</Typography>
        <Divider />
      </Box>

      <br /><br />

      <Card>
        <CardHeader title={ `Concepts (${ cart.contents.concepts.length })` } />
        <Divider />
        <CardContent>
          <pre>{JSON.stringify(cart.contents.concepts, null, 2)}</pre>
        </CardContent>
      </Card>

      <br /><br />

      <Card>
        <CardHeader title={ `Studies (${ cart.contents.studies.length })` } />
        <Divider />
        <CardContent>
          <pre>{JSON.stringify(cart.contents.studies, null, 2)}</pre>
        </CardContent>
      </Card>

      <br /><br />

      <Card>
        <CardHeader title={ `Variables (${ cart.contents.variables.length })` } />
        <Divider />
        <CardContent>
          <pre>{JSON.stringify(cart.contents.variables, null, 2)}</pre>
        </CardContent>
      </Card>

      <Divider sx={{ my: 8 }} />

      <Stack direction="row" justifyContent="space-around">
        <Link to="/search">Return to search</Link>

        <Tooltip title="Empty cart" placement="left">
          <IconButton onClick={ () => cart.clear() } sx={{ filter: 'opacity(0.5)', transition: 'filter 250ms', '&:hover': { filter: 'opacity(1.0)' } }}>
            <EmptyCartIcon size={24 } fill="var(--color-crimson)" />
          </IconButton>
        </Tooltip>
      </Stack>
    </PageContent>
  );
}

export default CartPage;
