import React, {
  Fragment, useCallback, useEffect, useMemo, useState,
} from 'react'
import { Box, Grid, Stack } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Dots } from '../loading'
import { Link } from '../link'
import { useSearch } from './context'
import { SearchSidebar } from './sidebar'
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

// this utility turns array
//   ['item1', 'item2', 'item3', ...]
// into filter object
//   { item1: false, item2: false, item3: false, ...}
const listToFilters = words => words.reduce((acc, f) => ({ ...acc, [f]: false }), {})

export const Results = () => {
  const {
    currentPage, facets, fetchConcepts, isLoading,
    pageCount, query, relatedConcepts, results,
  } = useSearch()

  const [filters, setFilters] = useState({ })

  // update filters when facets change,
  // retain selection, as items returned
  // are inconsistent between requests.
  useEffect(() => {
    if (facets.length === 0) { return }
    const updatedFilters = listToFilters(facets)
    setFilters(prevFilters => ({
      ...updatedFilters,
      ...prevFilters,
    }))
  }, [facets])

  
  // toggle the given filter
  const toggleFilter = f => {
    setFilters({
      ...filters,
      [f]: !filters[f],
    })
  }

  // turn all filters off
  const resetFilters = () => setFilters(listToFilters(facets))

  // let's get an array of active filters.
  const activeFilters = useMemo(() => {
    return Object.keys(filters)
      .filter(f => filters[f] === true)
  }, [filters])

  // apply filters to results
  const filteredResults = useMemo(() => {
    // if no filters are active...
    if (activeFilters.length === 0) {
      // ...show all results.
      return [...results]
    }
      // otherwise, update our list, with the filtering applied.
      return [...results]
        .filter(result => activeFilters.includes(result.type))
  }, [activeFilters, results])

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
        style={{ height: '300px' }}
        gap={ 3 }
      >
        {
          results.length ? (
            <Fragment>
              <Box>You've reached the end of this thread!</Box>
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
        Use the text field above to search for concepts
        in the BioData Catalyst ecosystem!
      </Stack>
    )
  }

  return (
    <Fragment>
      <br />
      <br />

      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
          <SearchSidebar
            filters={ filters }
            activeFilters={ activeFilters }
            toggleFilter={ toggleFilter }
            resetFilters={ resetFilters }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 8 } lg={ 9 }>
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
                    sm={ 12 } lg={ 6 }
                  >
                    <ResultCard result={ result } index={ i } />
                  </Grid>
                ))
              }
            </Grid>
          </InfiniteScroll>

          { isLoading && <Loader /> }
        </Grid>
      </Grid>
      <ResultDialog />
    </Fragment>
  )
}
