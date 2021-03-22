import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'
import { DeleteIcon, FolderIcon } from '../icons'
import { Link } from 'gatsby'
import { useDocSearch } from './search-context'

const SavedIndicator = styled(Link)`
  position: relative;
  display: block;
  filter: saturate(0.0);
  transition: filter 250ms;
  & .icon-overlay {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: var(--color-crimson);
    padding: 4px 6px;
    font-size: 85%;
    font-weight: bold;
    border-radius: 8px;
    color: #fff;
  }
  &:hover {
    filter: saturate(1.0);
  }
`

export const SavedDocs = () => {
  const { savedResults, clearSavedResults } = useDocSearch()

  return (
    <Fragment>
      <SavedIndicator to="/resources/doc-search/saved">
        <FolderIcon size={ 56 } fill="var(--color-crimson)" />
        <span className="icon-overlay">{ savedResults.length }</span>
      </SavedIndicator>
    </Fragment>
  )
}
