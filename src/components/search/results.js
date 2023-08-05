import React, { Fragment, useCallback, useMemo } from "react";
import { useSearch } from './context'
import {
  Box,
  Grid,
  Stack,
} from '@mui/material'
import { Dots } from '../loading'
import { Link } from '../link'
import { ResultDetails } from './result-details'
import InfiniteScroll from 'react-infinite-scroll-component'

//

const ResultCard = ({ index, result }) => {
  const { setSelectedResult } = useSearch()

  return (
    <Box
      onClick={ () => setSelectedResult(result) }
      as="pre"
      sx={{
        backgroundColor: '#eee',
        whiteSpace: 'pre-wrap',
        fontSize: '75%',
        overflow: 'auto',
        maxHeight: '300px',
        border: '1px solid var(--color-blueberry)',
        cursor: 'pointer',
        padding: '0.5rem',
        filter: 'opacity(0.5)',
        transition: 'filter 250ms',
        '&:hover': {
          filter: 'opacity(1.0)',
        },
        display: 'block',
        position: 'relative',
        '&::after': {
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          content: `"${ index + 1 }"`,
          borderBottom: '1px solid var(--color-blueberry)',
          borderLeft: '1px solid var(--color-blueberry)',
          p: '0.25rem 0.25rem 0.5rem 0.5rem',
        },
    }}
    >{ JSON.stringify(result, null, 1) }</Box>
  )
}

const Loader = () => {
  return (
    <Box sx={{
      minHeight: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}><Dots textPlacement="top" /></Box>
  )
}

const Suggestions = ({ concepts = [] }) => {
  if (concepts.length) {
    return (
      <Box>
        You might try continuing your search with one of these related concepts:
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
  return <span />
}

export const Results = () => {
  const {
    currentPage, fetchConcepts, isLoading, pageCount, query, relatedConcepts, results,
  } = useSearch()

  const canLoadMore = useMemo(() => currentPage < pageCount, [currentPage, pageCount])

  const loadMore = useCallback(() => {
    fetchConcepts(query, currentPage + 1)
  }, [fetchConcepts, query, currentPage])

  const EndMessage = () => {
    if (isLoading) return <span />
    return (
      <Stack justifyContent="center" alignItems="center" style={{ height: '300px' }} gap={ 3 }>
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

  if (query === '') {
    return (
      <Stack justifyContent="center" alignItems="center" style={{ height: '300px' }}>
        Use the text field aboe to search for concepts in the BioData Catalyst ecosystem!
      </Stack>
    )
  }

  return (
    <Fragment>
      <InfiniteScroll
        dataLength={ results.length }
        next={ loadMore }
        hasMore={ canLoadMore }
        endMessage={ <EndMessage /> }
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {
            results.map((result, i) => (
              <Grid item key={ `${i}_${result.id}` } xs={ 12 } md={ 6 }>
                <ResultCard result={ result } index={ i } />
              </Grid>
            ))
          }
        </Grid>
      </InfiniteScroll>

      { isLoading && <Loader /> }

      <ResultDetails />
    </Fragment>
  )
}
