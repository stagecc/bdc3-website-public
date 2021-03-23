import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Paragraph } from '../typography'
import { useDocSearch } from './search-context'
import { Result } from './search-result'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { FolderIcon } from '../icons'

export const SavedSearchList = () => {
  const { savedResults } = useDocSearch()

  return (
    <Fragment>
      <Card>
        <CardHeader>
          { savedResults.length } saved result{ savedResults.length !== 1 ? 's' : '' }
        </CardHeader>
        <CardBody>
          {
            savedResults.length
              ? savedResults.map((result, i) => <Result key={ `saved-result-${ i }_${ result.cacheId }` } index={ i + 1 } result={ result } />)
              : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                  <FolderIcon size={ 48 } fill="var(--color-lightgrey)" /> <span>Your saved searches folder is empty.</span>
                </div>
              )
          }
        </CardBody>
        <CardFooter>
          { savedResults.length } saved result{ savedResults.length !== 1 ? 's' : '' }
        </CardFooter>
      </Card>
    </Fragment>
  )
}