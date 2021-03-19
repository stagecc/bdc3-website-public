import React from 'react'
import styled from 'styled-components'
import { Result } from './search-result'
import { useDocSearch } from './search-context'
import { Dots as LoadingDots } from '../loading'
import { PaginationTray } from './pagination-tray'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { Paragraph } from '../typography'

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

const ResultsList = () => {
  const { currentPage, error, pageCount, results, searchedQuery, totalResults } = useDocSearch()

  // if there is an error
  if (error) { return <Paragraph center>We're sorry! { error.message }</Paragraph> }

  // if no error, but there are no results for a non-empty query, show note to user
  if (searchedQuery && totalResults === 0) {
    return (
      <Paragraph center>
        "{ searchedQuery }" returned no results.
      </Paragraph>
    )
  }

  // there are results, so show them
  return (
    <ResultsCard>
      <ResultsCardHeader>
        { totalResults > 0 && <span>Page { currentPage } of { pageCount }</span> }
      </ResultsCardHeader>
      <ResultsCardBody>
        {
          results.map((result, i) => {
            let thumbnailURL = ''
            if (result?.pagemap?.cse_thumbnail) {
              thumbnailURL = result.pagemap.cse_thumbnail[0].src
            }
            return (
              <Result
                key={ `${ i }_${ result.cacheId }` }
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
  )

}

export const SearchResults = () => {
  const { loading, totalResults } = useDocSearch()

  if (totalResults === '0') {
    return null
  }

  return (
    <Wrapper>
      { totalResults > 0 && <PaginationTray  /> }

      <br/>
      
      {
        loading
          ? <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="bottom" />
          : <ResultsList />
      }

      <br/>
      
      { totalResults > 0 && <PaginationTray  /> }

    </Wrapper>
  )
}