import React, { Fragment, useEffect, useRef } from 'react'
import { SEO } from '../../components/seo'
import styled, { css, keyframes } from 'styled-components'
import { useLocation } from '@reach/router'
import { PageContent } from '../../components/layout'
import { Title, Heading } from '../../components/typography'
import { Link } from 'gatsby'
import { FolderIcon, FolderFullIcon, UndoIcon } from '../../components/icons'
import { DocSearch, SearchForm, SearchResults, SavedSearchList, useDocSearch } from '../../components/doc-search'
import { useWindowWidth } from '../../hooks'

const Actions = styled.div`
  position: relative;
  margin: 0.5rem 0;
  & > a {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
`

const shake = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(-20deg); }
  30% { transform: rotate(20deg); }
  45% { transform: rotate(-10deg); }
  60% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
  90% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`

const dissipate = keyframes`
  0% { transform: scale(0.0); filter: opacity(1.0); }
  100% { transform: scale(2.0); filter: opacity(0.0); }
`

const SavedResultsLink = styled(Link).attrs({
  className: 'doc-search__saved-results-link',
})(({ dim = 0 }) => css`
  filter: saturate(0.75) opacity(${ dim ? 0.75 : 1.0 });
  transition: filter 250ms;
  & .wiggle {
    animation-name: ${ shake };
    animation-duration: 500ms;
    animation-iteration-count: 1;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      filter: opacity(0.0);
      transform-origin: 50% 50%;
      background-color: var(--color-blueberry);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: 999;
      animation-name: ${ dissipate };
      animation-duration: 500ms;
      animation-timing-function: ease-out;
      animation-iteration-count: 1;
    }
  }
  & .icon-overlay {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: var(--color-blueberry);
    padding: 2px 4px;
    font-size: 85%;
    border-radius: 8px;
    color: #fff;
  }
  &:hover {
    filter: saturate(1.0);
  }
`)

const ViewSavedResultsLink = () => {
  const { savedResults, clearSavedResults, docSearchPath } = useDocSearch()
  const wiggler = useRef()
    
  useEffect(() => {
    wiggler.current.classList.add('wiggle')
    const removeWiggleClass = () => {
      if (wiggler.current) {
        wiggler.current.classList.remove('wiggle')
      }
    }
    const wiggleTimer = setTimeout(removeWiggleClass, 500)
    return () => clearTimeout(removeWiggleClass)
  }, [savedResults.length])
  
  return (
    <SavedResultsLink to={ `${ docSearchPath }/#saved` } aria-label="View saved search results" dim={ savedResults.length === 0 ? 1 : 0 }>
      <span className="link-text">View saved results</span>
      <span ref={ wiggler }>
        { savedResults.length === 0 ? <FolderIcon size={ 36 } fill="var(--color-blueberry)" /> : <FolderFullIcon size={ 36 } fill="var(--color-blueberry)" /> }
        <span className="icon-overlay">{ savedResults.length }</span>
      </span>
    </SavedResultsLink>
  )
}

const ReturnToSearchLink = () => {
  const { docSearchPath } = useDocSearch()
  return (
    <Link to={ docSearchPath } aria-label="Return to search">
      <span className="link-text">Return to search</span>
      <UndoIcon size={ 36 } fill="var(--color-crimson)" />
    </Link>
  )
}

const DocSearchPage = () => {
  const location = useLocation()
  const { isCompact } = useWindowWidth()

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Search BioData Catalyst"
        description=""
        keywords=""
      />

      <DocSearch>
        <div style={{ display: 'flex', flexDirection: isCompact ? 'column' : 'row', alignItems: isCompact ? 'center' : 'flex-end', borderBottom: '1px solid #ccc' }}>
          <Title style={{ flex: 1, border: 0, marginBottom: 0 }}>Documentation Search</Title>
          <Actions>
            { location.hash === '#saved' ? <ReturnToSearchLink /> : <ViewSavedResultsLink /> }
          </Actions>
        </div>

        <br/><br/>
        
        <SearchForm />

        <br/><br/><br/>
 
        { location.hash === '#saved' ? <SavedSearchList /> : <SearchResults /> }

        <br/><br/><br/>
        
      </DocSearch>
      

    </PageContent>
  )
}

export default DocSearchPage
