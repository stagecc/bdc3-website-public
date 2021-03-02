import React, { useState } from 'react'
import styled from 'styled-components'
import { useDocSearch } from './search-context'
import { TextInput, InputGroup } from '../form'
import { Button } from '../buttons'

export const SearchForm = () => {
  const { query, handleChangeQuery, doSearch } = useDocSearch()

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      doSearch()
    }
  }

  return (
    <InputGroup style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <TextInput type="text" value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } />
      <Button onClick={ () => doSearch() }>Search</Button>
    </InputGroup>
  )
}