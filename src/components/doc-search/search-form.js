import React, { useEffect, useRef } from 'react'
import { useDocSearch } from './search-context'
import { TextInput, InputGroup } from '../form'
import { Button } from '../buttons'
import { SavedDocs } from './saved-docs'

export const SearchForm = () => {
  const { query, handleChangeQuery, doSearch } = useDocSearch()
  const input = useRef()

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      doSearch(1)
    }
  }

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [input.current])

  return (
    <InputGroup style={{ width: '100%' }}>
      <TextInput ref={ input } type="text" value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } />
      <Button onClick={ () => doSearch(1) }>Search</Button>
      <SavedDocs />
    </InputGroup>
  )
}