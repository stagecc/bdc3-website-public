import React from 'react'
import styled from 'styled-components'
import { ChevronLeftIcon as PreviousResultsIcon, ChevronRightIcon as NextResultsIcon, FirstPageIcon, LastPageIcon, MoreHorizontalIcon } from '../icons'
import { Button, IconButton } from '../buttons'
import { useGoogleSearch } from './search-context'

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
    & ${ Button } {
      margin: 0 0.25rem;
    }
  }
`

const PaginationIconButton = ({ icon, clickHandler, disabled }) => {
  const PaginationIcon = icon
  return (
    <IconButton disabled={ disabled } onClick={ disabled ? null : clickHandler }>
      <PaginationIcon size={ 36 } fill={ disabled ? 'var(--color-lightgrey)' : 'var(--color-crimson)' } />
    </IconButton>
  )
}

export const PaginationTray = () => {
  const {
    results, totalResults,
    currentPage, pageCount,
    doSearch, loading,
    handleGoToNextPage, handleGoToPreviousPage, handleGoToPage, handleGoToFirstPage, handleGoToLastPage,
  } = useGoogleSearch()
  return (
    <Wrapper>
      <div className="actions">
        <PaginationIconButton icon={ FirstPageIcon } clickHandler={ handleGoToFirstPage } disabled={ currentPage === 1 } />
        <PaginationIconButton icon={ PreviousResultsIcon } clickHandler={ handleGoToPreviousPage } disabled={ currentPage === 1 } />
        { [...Array(pageCount).keys()].map(i => <Button light={ currentPage !== i + 1 } small onClick={ handleGoToPage(i + 1) }>{ i + 1 }</Button>) }
        <PaginationIconButton icon={ NextResultsIcon } clickHandler={ handleGoToNextPage } disabled={ currentPage === pageCount } />
        <PaginationIconButton icon={ LastPageIcon } clickHandler={ handleGoToLastPage } disabled={ currentPage === pageCount } />
      </div>
    </Wrapper>
  )
}