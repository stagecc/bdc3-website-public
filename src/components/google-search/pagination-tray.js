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

const PaginationIconButton = styled(IconButton)`
  &:disabled {
    cursor: default;
    pointer-events: none;
    & svg {
      fill: var(--color-lightgrey);
    }
  }
`

export const PaginationTray = ({ currentPage, pageCount, goToFirstPageHandler, goToPreviousPageHandler, goToNextPageHandler, goToLastPageHandler }) => {
  return (
    <Wrapper>
      <div className="state">
        Page { currentPage } of { pageCount } <br />
      </div>
      <div className="actions">
        <PaginationIconButton onClick={ currentPage > 1 ? goToFirstPageHandler : null } disabled={ currentPage === 1 }>
          <FirstPageIcon size={ 24 } fill="var(--color-crimson)" />
        </PaginationIconButton>
        <PaginationIconButton onClick={ currentPage > 1 ? goToPreviousPageHandler : null } disabled={ currentPage === 1 }>
          <PreviousResultsIcon size={ 24 } fill="var(--color-crimson)" />
        </PaginationIconButton>
        <PaginationIconButton onClick={ currentPage < pageCount - 1 ? goToNextPageHandler : null } disabled={ currentPage === pageCount }>
          <NextResultsIcon size={ 24 } fill="var(--color-crimson)" />
        </PaginationIconButton>
        <PaginationIconButton onClick={ currentPage < pageCount - 1 ? goToLastPageHandler : null } disabled={ currentPage === pageCount }>
          <LastPageIcon size={ 24 } fill="var(--color-crimson)" />
        </PaginationIconButton>
      </div>
    </Wrapper>
  )
}