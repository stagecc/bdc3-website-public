import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Hidden } from 'react-grid-system'
import { Form, InputGroup, TextInput } from '../form'
import { Button } from '../buttons'
import { MagnifyingGlassIcon } from '../icons'
import { useSearch } from './context'

const SearchButton = styled(Button)`
  background-color: var(--color-blueberry);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

export const SearchForm = ({ focusOnMount = false, compact, style }) => {
  const { doSearch, query } = useSearch()
  const [formQuery, setFormQuery] = useState(query)
  const inputField = useRef()

  // unless specified otherwise, focus the search form input
  useEffect(() => {
    if (focusOnMount && inputField.current) {
      inputField.current.focus()
    }
  }, [focusOnMount])

  // this catches programmatic navigation to the search page,
  // sticking the query in the search form field.
  useEffect(() => {
    setFormQuery(query)
  }, [query])

  // update form field query
  const handleChangeFormQuery = event => {
    setFormQuery(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    doSearch(formQuery)
  }

  return (
    <Form onSubmit={ handleSubmit } style={ style }>
      <InputGroup>
        <TextInput
          type="text"
          placeholder="Search for concepts, studies, and variables"
          value={formQuery}
          onChange={handleChangeFormQuery}
        />
          <SearchButton small={ compact }>
            {
              compact ? (
                <MagnifyingGlassIcon size={ 20 } fill="var(--color-white)"/>
              ) : (
                <Fragment>
                  <Hidden xs>
                    Search <Hidden xs sm>BDC Data</Hidden>
                  </Hidden>
                  <Hidden sm md lg xl>
                    <MagnifyingGlassIcon size={ 20 } fill="var(--color-white)"/>
                  </Hidden>
                </Fragment>
              )
            }
          </SearchButton>
      </InputGroup>
    </Form>
  )
}
