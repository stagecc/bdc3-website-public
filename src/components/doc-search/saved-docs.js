import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'
import { DeleteIcon, FolderIcon } from '../icons'
import { Link } from 'gatsby'
import { useDocSearch } from './search-context'

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
      <SavedIndicator to="/resources/doc-search/#saved">
        <span className="link-text">View saved results</span>
        <FolderIcon size={ 56 } fill="var(--color-crimson)" />
        <span className="icon-overlay">{ savedResults.length }</span>
      </SavedIndicator>
    </Fragment>
  )
}
