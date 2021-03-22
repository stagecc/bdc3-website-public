import React, { Fragment, useEffect } from 'react'
import { SEO } from '../../components/seo'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { PageContent } from '../../components/layout'
import { Title, Heading } from '../../components/typography'
import { DocSearch, SavedDocs, SearchForm, SearchResults, SavedSearchList } from '../../components/doc-search'
import { Link } from 'gatsby'
import { UndoIcon } from '../../components/icons'

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

const BackToSearchLink = () => {
  return (
    <Link to="/resources/doc-search" style={{ display: 'flex', gap: '1rem' }}>
      <span className="link-text">Back to Search</span> 
      <UndoIcon fill="var(--color-crimson)" size={ 36 } />
    </Link>
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
                ? <BackToSearchLink />
                : <SavedDocs />
            }
          </Actions>
        </div>

        <br/><br/>
        
      {
        location.hash === '#saved' ? (
          <SavedSearchList />
        ) : (
          <Fragment>
            <SearchForm />

            <br/><br/><br/>

            <SearchResults />

            <br/><br/><br/>
          </Fragment>
        )
      }
        
      </DocSearch>
      

    </PageContent>
  )
}

export default DocSearchPage
