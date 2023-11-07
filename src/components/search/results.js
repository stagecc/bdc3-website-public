import React, { Fragment, useCallback, useMemo } from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Dots } from '../loading'
import { Link } from '../link'
import { useSearch } from './context'
import { ResultCard } from './result-card'
import { ResultDialog } from './result-dialog'
import { ControlledFetcher } from './controlled-fetcher'

//

const LoadingIndicator = () => (
  <Stack
    justifyContent="center"
    alignItems="center"
    sx={{ height: '300px', mt: 8 }}
    gap={ 3 }
  ><Dots textPlacement="top" text="Searching..." /></Stack>
)

//

const Suggestions = ({ concepts = [] }) => {
  if (concepts.length === 0) {
    return <span />
  }

  return (
    <Box sx={{ '& li': { my: 1 } }}>
      Continue your search with one of these related concepts:
      <br />
      <ul>
        {
          concepts.map(concept => (
            <li key={ `related_${ concept }` }>
              <Link to={ `/search?q=${ concept }` }>{ concept }</Link>
            </li>
          ))
        }
      </ul>
    </Box>
  )
}

//

export const Results = () => {
  const {
    currentPage, fetchConcepts, filteredResults, isLoading,
    pageCount, query, relatedConcepts,
  } = useSearch()

  // boolean, whether more results exist beyond our current list
  // (util for controlled fetcher)
  const canLoadMore = useMemo(() => currentPage < pageCount, [currentPage, pageCount])

  // function to handle fetching new results to list
  // (util for controlled fetcher)
  const loadMore = useCallback(() => fetchConcepts(query, currentPage + 1), [fetchConcepts, query, currentPage])

  // this gets rendered when the bottom of our list,
  // when more data are available to fetch.
  // (util for controlled fetcher)
  const MoreMessage = () => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '300px', mt: 8 }}
        gap={ 3 }
      >
        <Button
          variant="outlined"
          size="large"
          onClick={ loadMore }
          aria-label="Load more results"
        >Load More Results</Button>
      </Stack>
    )
  }

  // this gets rendered when the bottom of
  // the infinite scroll container is reached.
  // (util for controlled fetcher)
  const NoMoreMessage = () => {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '300px', mt: 8 }}
        gap={ 3 }
      >
        {
          filteredResults.length ? (
            <Fragment>
              <Box>It looks like we're at the end of this road.</Box>
              <Suggestions concepts={ relatedConcepts } />
            </Fragment>
          ) : <Box>No results!</Box>
        }
      </Stack>
    )
  }

  // no searching has taken place yet.
  if (query === '') {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{ height: '300px' }}
      >
        Search concepts, stuies, and variables
        in the BioData Catalyst ecosystem!
      </Stack>
    )
  }

  return (
    <Fragment>
      <ControlledFetcher
        dataLength={ filteredResults.length }
        hasMore={ canLoadMore }
        fetchMore={ loadMore }
        loading={ isLoading }
        moreMessage={ <MoreMessage /> }
        loadingMessage={ <LoadingIndicator /> }
        noMoreMessage={ <NoMoreMessage /> }
      >
        <Grid container spacing={ 4 }>
          {
            filteredResults.map((result, i) => (
              <Grid item
                key={ `${i}_${result.id}` }
                xs={ 12 } lg={ 6 }
              >
                <ResultCard result={ result } index={ i } />
              </Grid>
            ))
          }
        </Grid>
      </ControlledFetcher>

      <ResultDialog />
    </Fragment>
  )
}
