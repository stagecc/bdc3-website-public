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
      { totalResults > 0 && <PaginationTray  /> }

      <br/>
      
      <ResultsCard>
        <ResultsCardHeader>
          { totalResults > 0 && <span>Page { currentPage } of { pageCount }</span> }
        </ResultsCardHeader>
        <ResultsCardBody>
          {
            loading
              ? <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="bottom" />
              : results.map((result, i) => {
                let thumbnailURL = ''
                if (result?.pagemap?.cse_thumbnail) {
                  thumbnailURL = result?.pagemap?.cse_thumbnail[0].src
                }
                return (
                  <Result
                    key={ result.cacheId }
                    index={ (currentPage - 1) * 10 + i + 1 }
                    title={ result.title }
                    displayLink={ result.displayLink }
                    link={ result.link }
                    htmlSnippet={ result.htmlSnippet }
                    snippet={ result.snippet }
                    imageURL={ thumbnailURL }
                  />
                )
              })
          }
        </ResultsCardBody>
        <ResultsCardFooter>
          { totalResults > 0 && <span>Page { currentPage } of { pageCount }</span> }
        </ResultsCardFooter>
      </ResultsCard>

      <br/>
      
      { totalResults > 0 && <PaginationTray  /> }

    </Wrapper>
  )
}