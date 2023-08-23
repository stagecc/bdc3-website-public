import React from 'react'
import {
  Button, Card, CardActionArea, CardContent, CardHeader,
  Divider, IconButton, Stack, Tooltip, Typography,
} from '@mui/material'
import { PageContent } from '../../components/layout'
import { SEO } from '../../components/seo'
import { Link } from '../../components/link'
import { useSearch } from '../../components/search'
import { DeleteIcon as ClearCollectionIcon } from '../../components/icons'
import { downloadJson } from '../../utils'

//

const CollectionPage = () => {
  const { cart } = useSearch()

  const handleClickDownloadAsJson = event => {
    event.preventDefault()
    const timestamp = new Date().toISOString()
    downloadJson(cart.contents, `BDC-Collection_${ timestamp }.json`)
  }

  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title="Favorites - Semantic Search"
        description="Favorites - BioData Catalyst semantic search provided by Dug"
      />

      <section>
        <Typography variant="h1">Semantic Search: My Collection</Typography>

        <Card>
          <CardHeader title={ `Concepts (${ cart.contents.concepts.length })` } />
          <Divider />
          <CardContent component="pre" sx={{ backgroundColor: '#eee', fontSize: '75%', m: 0 }}>
            { JSON.stringify(cart.contents.concepts, null, 2) }
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={ `Studies (${ cart.contents.studies.length })` } />
          <Divider />
          <CardContent component="pre" sx={{ backgroundColor: '#eee', fontSize: '75%', m: 0 }}>
            { JSON.stringify(cart.contents.studies, null, 2) }
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={ `Variables (${ cart.contents.variables.length })` } />
          <Divider />
          <CardContent component="pre" sx={{ backgroundColor: '#eee', fontSize: '75%', m: 0 }}>
            { JSON.stringify(cart.contents.variables, null, 2) }
          </CardContent>
        </Card>
      
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-around">
          <Link to="/search">Return to search</Link>

          <Button onClick={ handleClickDownloadAsJson }>Download as JSON</Button>

          <Tooltip title="Clear Collection" placement="left">
            <IconButton onClick={ () => cart.clear() } sx={{ filter: 'opacity(0.5)', transition: 'filter 250ms', '&:hover': { filter: 'opacity(1.0)' } }}>
              <ClearCollectionIcon size={ 24 } fill="var(--color-crimson)" />
            </IconButton>
          </Tooltip>
        </Stack>
      </section>

      <Divider sx={{ my: 8 }} />

      <section>
        <Typography variant="h2">Next Steps</Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          gap={ 4 }
          sx={{ width: '100%', '.MuiCard-root': { flex: 1 } }}
        >
          <Card>
            <CardActionArea>
              <CardHeader title="Check Access" />
              <CardContent>
                Voluptate minim dolore voluptate est qui adipisicing velit mollit et deserunt commodo ad laboris non consectetur.
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardHeader title="Analyze" />
              <CardContent>
                Laboris ad magna sunt in adipisicing deserunt occaecat nulla magna dolore laboris irure esse ex adipisicing sunt laborum amet.
              </CardContent>
            </CardActionArea>
          </Card>
          <Card>
            <CardActionArea>
              <CardHeader title="Continue search" />
              <CardContent>
                With Gen3 or PIC-SURE, eu minim sint proident magna cupidatat sit dolore exercitation veniam pariatur minim sunt est culpa.
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </section>

    </PageContent>
  );
}

export default CollectionPage;
