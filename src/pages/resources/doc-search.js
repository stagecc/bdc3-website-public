import React, { Fragment, useEffect } from 'react'
import { SEO } from '../../components/seo'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { PageContent } from '../../components/layout'
import { Title, Heading } from '../../components/typography'
import { Link } from 'gatsby'
import { FolderIcon, FolderFullIcon, UndoIcon } from '../../components/icons'
import { DocSearch, SearchForm, SearchResults, SavedSearchList, useDocSearch } from '../../components/doc-search'
import ReactTooltip from 'react-tooltip'

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

const SavedResultsLink = styled(Link)`
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

const ViewSavedResultsLink = () => {
  const { savedResults, clearSavedResults } = useDocSearch()
  return (
    <SavedResultsLink to="/resources/doc-search/#saved" aria-label="View saved search results">
      { savedResults.length === 0 ? <FolderIcon size={ 36 } fill="var(--color-crimson)" /> : <FolderFullIcon size={ 36 } fill="var(--color-crimson)" /> }
      <span className="icon-overlay">{ savedResults.length }</span>
    </SavedResultsLink>
  )
}

const ReturnToSearchLink = () => {
  const { docSearchPath } = useDocSearch()
  return (
    <Link to={ docSearchPath } aria-label="Return to search">
      <UndoIcon size={ 36 } fill="var(--color-crimson)" />
    </Link>
  )
}

const DocSearchPage = () => {
  const location = useLocation()

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
              location.hash === '#saved' ? (
                  <Fragment>
                    <p data-tip="Return to search">
                      <ReturnToSearchLink />
                    </p>
                    <ReactTooltip place="left" type="dark" effect="solid"/>
                  </Fragment>
                ) : (
                  <Fragment>
                    <p data-tip="View saved results folder">
                      <ViewSavedResultsLink />
                    </p>
                    <ReactTooltip place="left" type="dark" effect="solid"/>
                  </Fragment>
                )
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
