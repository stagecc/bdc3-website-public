import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'
import { DeleteIcon, FolderIcon } from '../icons'
import { Link } from 'gatsby'
import { useDocSearch } from './search-context'

export const SavedDocs = () => {
  const { savedResults, clearSavedResults } = useDocSearch()

  useEffect(() => {
    console.log('in saved-docs')
    console.log(savedResults)
  }, [savedResults])

  return (
    <Fragment>
      <Link to="/resources/doc-search/saved">
        <FolderIcon size={ 36 } />({ savedResults.length })
      </Link>
      <Button to="/resources/doc-search/saved" small light onClick={ clearSavedResults }>
        <DeleteIcon size={ 36 } />
      </Button>
    </Fragment>
  )
}
