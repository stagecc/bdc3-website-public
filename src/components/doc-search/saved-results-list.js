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
        <CardHeader style={{ backgroundColor: 'var(--color-blueberry)' }}>
          {
            savedResults.length > 0 && (
              <Fragment>
                <p data-tip="Clear saved searches" style={{ margin: 0 }} key={ 'asd'}>
                  <IconButton onClick={ clearSavedResults }>
                    <DeleteIcon size={ 24 } fill="#fff" />
                  </IconButton>
                </p>
              </Fragment>
            )
          }
          <span style={{ flex: 1 }}>
            { savedResults.length } saved result{ savedResults.length !== 1 ? 's' : '' }
          </span>
        </CardHeader>
        <CardBody style={{ padding: 0, border: 0 }}>
          {
            savedResults.length
              ? savedResults.map((result, i) => <Result key={ `saved-result-${ i }_${ result.cacheId }` } index={ i + 1 } result={ result } />)
              : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '4rem 0' }}>
                  <FolderIcon size={ 48 } fill="var(--color-lightgrey)" /> <span>Your saved searches folder is empty.</span>
                </div>
              )
          }
        </CardBody>
        <CardFooter style={{ backgroundColor: 'var(--color-blueberry)' }}>
          { savedResults.length } saved result{ savedResults.length !== 1 ? 's' : '' }
        </CardFooter>
      </Card>
      
      <br/><br/>
      
      <Paragraph center style={{ width: '90%', maxWidth: '800px', margin: 'auto' }}>
        Your saved results folder is stored in your browser,
        so its contents will be readily available when you return here later, in this browser.
        However, contents saved in this browser will not be available if you access this site
        using a different browser or a different device.
      </Paragraph>
    </Fragment>
  )
}