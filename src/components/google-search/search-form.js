import React, { useState } from 'react'
import styled from 'styled-components'
import { useGoogleSearch } from './search-context'
import { TextInput, InputGroup } from '../form'
import { Button } from '../buttons'

export const SearchForm = () => {
  const { query, handleChangeQuery, doSearch } = useGoogleSearch()

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      doSearch()
    }
  }

  return (
    <InputGroup>
      <TextInput type="text" value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } />
      <Button onClick={ doSearch }>Search</Button>
    </InputGroup>
  )
}