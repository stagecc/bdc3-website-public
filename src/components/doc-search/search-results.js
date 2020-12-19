import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Result } from './search-result'
import { useDocSearch } from './search-context'
import { Dots as LoadingDots } from '../loading'
import { PaginationTray } from './pagination-tray'
import { Card, CardHeader, CardBody, CardFooter } from '../card'

const Wrapper = styled.section``

export const ResultsCard = styled(Card)``

export const ResultsCardHeader = styled(CardHeader)`
    display: flex;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
`

export const ResultsCardBody = styled(CardBody)``

export const ResultsCardFooter = styled(CardFooter)`
    display: flex;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
`

export const ResultsCardTitle = styled.span`
    flex: 1;
`

export const SearchResults = () => {
  const {
    results, totalResults,
    currentPage, pageCount,
    doSearch, loading, error,
    handleGoToNextPage, handleGoToPreviousPage, handleGoToPage, handleGoToFirstPage, handleGoToLastPage,
  } = useDocSearch()

  return (
    <Wrapper>
      {
        totalResults > 0 && (
          <PaginationTray
            currentPage={ currentPage }
            pageCount={ pageCount }
            goToFirstPageHandler={ handleGoToFirstPage }
            goToPreviousPageHandler={ handleGoToPreviousPage }
            goToPageHandler={ handleGoToPage }
            goToNextPageHandler={ handleGoToNextPage }
            goToLastPageHandler={ handleGoToLastPage }
          />
        )
      }

      <ResultsCard>
        <ResultsCardHeader>
          { totalResults > 0 && <span>Page { currentPage } of { pageCount }</span> }
        </ResultsCardHeader>
        <ResultsCardBody>
          {
            loading
              ? <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="bottom" />
              : results.map((result, i) => <Result key={ result.cacheId } index={ (currentPage - 1) * 10 + i + 1 } { ...result } />)
          }
        </ResultsCardBody>
        <ResultsCardFooter>
          { totalResults > 0 && <span>Page { currentPage } of { pageCount }</span> }
        </ResultsCardFooter>
      </ResultsCard>

        {
          totalResults > 0 && (
            <PaginationTray
              currentPage={ currentPage }
              pageCount={ pageCount }
              goToFirstPageHandler={ handleGoToFirstPage }
              goToPreviousPageHandler={ handleGoToPreviousPage }
              goToPageHandler={ handleGoToPage }
              goToNextPageHandler={ handleGoToNextPage }
              goToLastPageHandler={ handleGoToLastPage }
            />
          )
        }

    </Wrapper>
  )
}