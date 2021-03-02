import React from 'react'
import styled from 'styled-components'
import { ChevronLeftIcon as PreviousResultsIcon, ChevronRightIcon as NextResultsIcon, FirstPageIcon, LastPageIcon, EllipsisIcon } from '../icons'
import { Button, IconButton } from '../buttons'
import { useDocSearch } from './search-context'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  & .actions {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

const PaginationPageButton = styled(Button)`
  margin: 0 0.25rem;
`

const PaginationIconButton = ({ icon, clickHandler, disabled }) => {
  const PaginationIcon = icon
  return (
    <IconButton disabled={ disabled } onClick={ disabled ? null : clickHandler }>
      <PaginationIcon size={ 24 } fill={ disabled ? 'var(--color-lightgrey)' : 'var(--color-crimson)' } />
    </IconButton>
  )
}

export const PaginationTray = () => {
  const {
    results, totalResults,
    currentPage, pageCount, paginationRadius,
    doSearch, loading,
    handleGoToNextPage, handleGoToPreviousPage, handleGoToPage, handleGoToFirstPage, handleGoToLastPage,
  } = useDocSearch()
  return (
    <Wrapper>
      <div className="actions">
        <PaginationIconButton icon={ FirstPageIcon } clickHandler={ handleGoToFirstPage } disabled={ currentPage <= 1 } />
        <PaginationIconButton icon={ PreviousResultsIcon } clickHandler={ handleGoToPreviousPage } disabled={ currentPage <= 1 } />
        <EllipsisIcon fill={ currentPage > paginationRadius + 1 ? '#ccc' : 'transparent' } size={ 24 } />
        &nbsp;&nbsp;
        {
          [...Array(pageCount).keys()].map(i => {
            // we only want three page links on either side f the current link if possible
            // for pages 1, 2, 3, this means shifting the viewing window accordingly:
            //  page 2: [1, (2), 3, 4, 5, 6, 7]
            //  page 3: [1, 2, (3), 4, 5, 6, 7]
            //  page 4: [1, 2, 3, (4), 5, 6, 7]
            //  page 5: [2, 3, 4, (5), 6, 7, 8]
            //  page 6: [3, 4, 5, (6), 7, 8, 9]
            let minPage = currentPage - paginationRadius
            let maxPage = currentPage + paginationRadius
            
            // are we low in the pages?
            if (currentPage <= paginationRadius) { [minPage, maxPage] = [1, 2 * paginationRadius + 1] }
            
            // are we near the end?
            if (currentPage >= pageCount - paginationRadius) { [minPage, maxPage] = [pageCount - 2 * paginationRadius, pageCount]}
            
            // omit page links outsie out viewing window
            if (i + 1 < minPage || maxPage < i + 1) {
              return null
            }
            
            return <PaginationPageButton small light={ currentPage !== i + 1 } key={ `page-${ i }` } onClick={ handleGoToPage(i + 1) }>{ i + 1 }</PaginationPageButton>
          })
        }
        &nbsp;&nbsp;
        <EllipsisIcon fill={ pageCount > 2 * paginationRadius - 1 && currentPage < pageCount - paginationRadius ? '#ccc' : 'transparent' } size={ 24 } />
        <PaginationIconButton icon={ NextResultsIcon } clickHandler={ handleGoToNextPage } disabled={ currentPage >= pageCount } />
        <PaginationIconButton icon={ LastPageIcon } clickHandler={ handleGoToLastPage } disabled={ currentPage >= pageCount } />
      </div>
    </Wrapper>
  )
}