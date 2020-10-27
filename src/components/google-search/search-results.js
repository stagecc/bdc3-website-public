import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Result } from './result'
import { SearchContext } from './search-context'

const Wrapper = styled.section``

export const SearchResults = () => {
  const { results, totalResults, currentPage, pageCount, doSearch } = useContext(SearchContext)
  return (
    <Wrapper>
      Current Page: { currentPage } / { pageCount } <br />

      <button onClick={ currentPage > 0 ? () => doSearch(currentPage - 1) : null }>prev</button>
      <button onClick={ currentPage === pageCount ? null : () => doSearch(currentPage + 1) }>next</button>

      <hr />

      { results.map(result => <Result key={ result.cacheId } { ...result } />) }
    </Wrapper>
  )
}