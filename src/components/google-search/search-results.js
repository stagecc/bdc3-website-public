import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Result } from './search-result'
import { SearchContext } from './search-context'
import { Dots as LoadingDots } from '../loading'
import { PaginationTray } from './pagination-tray'

const Wrapper = styled.section``

export const SearchResults = () => {
  const {
    results, totalResults,
    currentPage, pageCount,
    doSearch, loading,
    handleGoToNextPage, handleGoToPreviousPage, handleGoToFirstPage, handleGoToLastPage,
  } = useContext(SearchContext)

  return (
    <Wrapper>
      {
        totalResults > 0 && (
          <PaginationTray
            currentPage={ currentPage }
            pageCount={ pageCount }
            goToFirstPageHandler={ handleGoToFirstPage }
            goToPreviousPageHandler={ handleGoToPreviousPage }
            goToNextPageHandler={ handleGoToNextPage }
            goToLastPageHandler={ handleGoToLastPage }
          />
        )
      }

      <hr />

      {
        loading
          ? <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="bottom" />
          : results.map((result, i) => <Result key={ result.cacheId } index={ (currentPage - 1) * 10 + i + 1 } { ...result } />)
      }

      <hr />

      {
        totalResults > 0 && (
          <PaginationTray
            currentPage={ currentPage }
            pageCount={ pageCount }
            goToFirstPageHandler={ handleGoToFirstPage }
            goToPreviousPageHandler={ handleGoToPreviousPage }
            goToNextPageHandler={ handleGoToNextPage }
            goToLastPageHandler={ handleGoToLastPage }
          />
        )
      }

    </Wrapper>
  )
}