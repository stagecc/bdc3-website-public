import React, { Fragment, useCallback } from "react";
import { useSearch } from './context'
import { Pagination } from '@mui/material'
import { Dots } from '../loading'

//

export const Results = () => {
  const {
    currentPage, doSearch, isLoading, pageCount, query, resultCount, results,
  } = useSearch()
  
  const ResultsHeader = useCallback(() => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          { resultCount } concepts found for &ldquo;{ query }&rdquo;
        </div>
        <div>
          { pageCount } pages
        </div>
        <div>
          <Pagination
            defaultPage={1}
            page={currentPage}
            count={pageCount}
            onChange={(event, page) => doSearch(query, page)}
          />
        </div>
      </div>
    )
  }, [currentPage, doSearch, pageCount, query, resultCount])

  return (
    <Fragment>
      <br />
  
      <ResultsHeader />

      {
        isLoading ? (
          <div style={{
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}><Dots textPlacement="top" /></div>
        ) : (
          <Fragment>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)',
              gridGap: '1rem',
            }}>
              {
                results.map((result, i) => (
                  <pre
                    key={ `${i}_${result.id}` }
                    style={{
                      whiteSpace: 'pre-wrap',
                      fontSize: '75%',
                      overflow: 'auto',
                      maxHeight: '300px',
                      border: '2px solid crimson',
                    }}
                  >{ JSON.stringify(result, null, 2) }</pre>
                ))
            }
            </div>
            
            <br />

            <ResultsHeader />
          </Fragment>
        )
      }
      
    </Fragment>
  )
}