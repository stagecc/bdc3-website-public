import React from 'react'
import styled from 'styled-components'
import { ChevronLeftIcon as PreviousResultsIcon, ChevronRightIcon as NextResultsIcon, FirstPageIcon, LastPageIcon, MoreHorizontalIcon } from '../icons'
import { IconButton } from '../buttons'

const Wrapper = styled.div`
  & .state {
    text-align: center;
  }
  & .actions {
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
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

export const PaginationTray = ({ currentPage, pageCount, goToFirstPageHandler, goToPreviousPageHandler, goToNextPageHandler, goToLastPageHandler }) => {
  return (
    <Wrapper>
      <div className="state">
        Page { currentPage } of { pageCount } <br />
      </div>
      <div className="actions">
        <PaginationIconButton
          icon={ FirstPageIcon }
          clickHandler={ goToFirstPageHandler }
          disabled={ currentPage === 1 }
        />
        <PaginationIconButton
          icon={ PreviousResultsIcon }
          clickHandler={ goToPreviousPageHandler }
          disabled={ currentPage === 1 }
        />
        <PaginationIconButton
          icon={ NextResultsIcon }
          clickHandler={ goToNextPageHandler }
          disabled={ currentPage === pageCount }
        />
        <PaginationIconButton
          icon={ LastPageIcon }
          clickHandler={ goToLastPageHandler }
          disabled={ currentPage === pageCount }
        />
      </div>
    </Wrapper>
  )
}