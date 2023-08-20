import React, { Fragment, useCallback, useMemo } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Dots } from '../loading'
import { Link } from '../link'
import { useSearch } from './context'
import { ResultCard } from './result-card'
import { ResultDialog } from './result-dialog'

//

const Loader = () => (
  <Box sx={{
    minHeight: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}><Dots textPlacement="top" text="Searching..." /></Box>
)

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

export const Results = () => {
  const {
    currentPage, fetchConcepts, filteredResults, isLoading,
    pageCount, query, relatedConcepts,
  } = useSearch()

  // boolean, whether more results exist beyond our current list
  // (util for infinite scroll)
  const canLoadMore = useMemo(() => currentPage < pageCount, [currentPage, pageCount])

  // function to handle fetching new results to list
  // (util for infinite scroll)
  const loadMore = useCallback(() => {
    fetchConcepts(query, currentPage + 1)
  }, [fetchConcepts, query, currentPage])

  // this gets rendered when the bottom of
  // the infinite scroll container is reached.
  // (util for infinite scroll)
  const EndMessage = () => {
    if (isLoading) return <span />
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
              <Box>It looks like we're at the end of this thread.</Box>
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
      <InfiniteScroll
        dataLength={ filteredResults.length }
        next={ loadMore }
        hasMore={ canLoadMore }
        endMessage={ <EndMessage /> }
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
      </InfiniteScroll>

      { isLoading && <Loader /> }

      <ResultDialog />
    </Fragment>
  )
}
