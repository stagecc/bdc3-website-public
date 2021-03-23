import React, { Fragment, useEffect } from 'react'
import { SEO } from '../../components/seo'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { PageContent } from '../../components/layout'
import { Title, Heading } from '../../components/typography'
import { Link } from 'gatsby'
import { FolderIcon, UndoIcon } from '../../components/icons'
import { DocSearch, SearchForm, SearchResults, SavedSearchList, useDocSearch } from '../../components/doc-search'

const Actions = styled.div`
  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    & .link-text {
      transition: filter 250ms;
      filter: opacity(0.0);
    }
    &:hover .link-text {
      filter: opacity(1.0);
    }
  }
`

const SavedIndicator = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  filter: saturate(0.0);
  transition: filter 250ms;
  & .link-text {
    transition: filter 250ms;
    filter: opacity(0.0);
  }
  &:hover .link-text {
    filter: opacity(1.0);
  }
  & .icon-overlay {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: var(--color-crimson);
    padding: 2px 4px;
    font-size: 85%;
    border-radius: 8px;
    color: #fff;
  }
  &:hover {
    filter: saturate(1.0);
  }
`

const SavedDocs = () => {
  const { savedResults, clearSavedResults } = useDocSearch()

  return (
    <Fragment>
      <SavedIndicator to="/resources/doc-search/#saved">
        <FolderIcon size={ 36 } fill="var(--color-crimson)" />
        <span className="icon-overlay">{ savedResults.length }</span>
      </SavedIndicator>
    </Fragment>
  )
}

const ReturnToSearchLink = () => {
  return (
    <Fragment>
      <Link to="/resources/doc-search" style={{ display: 'flex', gap: '1rem' }} aria-label="Return to Search">
        <UndoIcon fill="var(--color-crimson)" size={ 36 } />
      </Link>
    </Fragment>
  )
}

const DocSearchPage = () => {
  const location = useLocation()

  useEffect(() => {
    console.log(location.hash)
    // if (location.hash === '#saved') {

    // }
  }, [location.hash])

  
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Search BioData Catalyst"
        description=""
        keywords=""
      />

      <DocSearch>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Title style={{ flex: 1 }}>BioData Catalyst Documentation Search</Title>
          <Actions>
            {
              location.hash === '#saved'
                ? <ReturnToSearchLink />
                : <SavedDocs />
            }
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
