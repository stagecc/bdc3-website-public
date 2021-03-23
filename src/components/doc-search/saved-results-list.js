import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Paragraph } from '../typography'
import { useDocSearch } from './search-context'
import { Result } from './search-result'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { IconButton } from '../buttons'
import { DeleteIcon, FolderIcon } from '../icons'
import ReactTooltip from 'react-tooltip'

export const SavedSearchList = () => {
  const { clearSavedResults, savedResults } = useDocSearch()

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <span style={{ flex: 1 }}>
            { savedResults.length } saved result{ savedResults.length !== 1 ? 's' : '' }
          </span>
          {
            savedResults.length > 0 && (
              <Fragment>
                <p data-tip="Clear saved searches" style={{ margin: 0 }} key={ 'asd'}>
                  <IconButton onClick={ clearSavedResults }>
                    <DeleteIcon size={ 24 } fill="#fff" />
                  </IconButton>
                </p>
                <ReactTooltip place="left" type="dark" effect="solid"/>
              </Fragment>
            )
          }
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