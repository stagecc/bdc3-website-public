import React, { useEffect, useRef } from 'react'
import { useDocSearch } from './search-context'
import { TextInput, InputGroup } from '../form'
import { Button } from '../buttons'
import { navigate, useLocation } from '@reach/router'
import { useWindowWidth } from '../../hooks'

export const SearchForm = () => {
  const location = useLocation
  const { query, handleChangeQuery, doSearch } = useDocSearch()
  const { isCompact } = useWindowWidth()
  const input = useRef()

  const handleSearch = () => {
    doSearch(1)
    if (location.pathname !== '/resources/doc-search') {
      navigate('/resources/doc-search')
    }
  }

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearch()
    }
  }

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [input.current])

  return (
    <InputGroup style={{ width: '100%' }} flexDirection={ isCompact ? 'column' : 'row' }>
      <TextInput ref={ input } type="text" value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } />
      <Button onClick={ handleSearch }>Search</Button>
    </InputGroup>
  )
}