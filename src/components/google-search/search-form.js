import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { GoogleSearch } from './search-context'
const Wrapper = styled.form``

export const SearchForm = () => {
  const [query, setQuery] = useState('')
  const { doSearch } = useContext(GoogleSearch)

  const handleChangeQuery = event => setQuery(event.target.value)

  return (
    <Wrapper>
      <input type="text" value={ query } onChange={ handleChangeQuery } />
      <button onClick={ () => doSearch(query) }>Search</button>
    </Wrapper>
  )
}