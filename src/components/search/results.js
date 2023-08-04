import React, { Fragment, useCallback, useState } from "react";
import { useSearch } from './context'
import {
  Box,
  Grid,
  Pagination,
  Stack,
} from '@mui/material'
import { Dots } from '../loading'
import { ResultDetails } from './result-details'

//

const ResultCard = ({ result, onClick }) => {
  return (
    <Box
      as="pre"
      sx={{
        backgroundColor: '#eee',
        whiteSpace: 'pre-wrap',
        fontSize: '75%',
        overflow: 'hidden',
        maxHeight: '300px',
        border: '1px solid var(--color-blueberry)',
        cursor: 'pointer',
        padding: '0.5rem',
        filter: 'opacity(0.5)',
        transition: 'filter 250ms',
        '&:hover': {
          filter: 'opacity(1.0)',
        }
      }}
    >{ JSON.stringify(result, null, 1) }</Box>
  )
}

export const Results = () => {
  const {
    currentPage, doSearch, isLoading, pageCount, query, PER_PAGE,
    resultCount, results, setSelectedResult,
  } = useSearch()

  const ResultsHeader = useCallback(() => {
    const resultSpan = `${ (currentPage - 1) * PER_PAGE + 1 } to ${ Math.min(currentPage * PER_PAGE, resultCount) }`
    return (
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Box>Showing { resultSpan } of { resultCount } concepts found for &ldquo;{ query }&rdquo;</Box>
        <Pagination
          defaultPage={ 1 }
          page={ currentPage }
          count={ pageCount }
          onChange={ (event, page) => doSearch(query, page) }
        />
      </Stack>
    )
  }, [currentPage, doSearch, pageCount, PER_PAGE, query, resultCount])

  return (
    <Fragment>
      <br />
  
      {
        isLoading ? (
          <Box sx={{
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}><Dots textPlacement="top" /></Box>
        ) : (
          <Fragment>
            <ResultsHeader />

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {
                results.map((result, i) => (
                  <Grid item key={ `${i}_${result.id}` }
                    xs={ 12 } md={ 6 }
                    onClick={ () => setSelectedResult(result) }
                  >
                    <ResultCard result={ result } />
                  </Grid>
                ))
              }
            </Grid>

            <br />

            <ResultsHeader />
          </Fragment>
        )
      }

      <ResultDetails />
      
    </Fragment>
  )
}