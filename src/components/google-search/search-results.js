import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Result } from './result'
import { SearchContext } from './search-context'
import { Dots as LoadingDots } from '../loading'

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
      Current Page: { currentPage } / { pageCount } <br />

      <button onClick={ currentPage > 0 ? handleGoToFirstPage : null }>first</button>
      <button onClick={ currentPage > 0 ? handleGoToPreviousPage : null }>prev</button>
      <button onClick={ currentPage < pageCount - 1 ? handleGoToNextPage : null }>next</button>
      <button onClick={ currentPage < pageCount - 1 ? handleGoToLastPage : null }>last</button>

      <hr />

      {
        loading
          ? <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="bottom" />
          : results.map(result => <Result key={ result.cacheId } { ...result } />)
      }
    </Wrapper>
  )
}