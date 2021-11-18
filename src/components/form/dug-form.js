import React, { Fragment, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Hidden } from 'react-grid-system'
import { Form, InputGroup, TextInput } from './'
import { Button } from '../buttons'
import { InfoIcon, MagnifyingGlassIcon } from '../icons'

const SearchButton = styled(Button)`
  background-color: var(--color-blueberry);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

export const DugForm = ({ focusOnMount = false, compact, style }) => {
  const inputField = useRef()

  const doSearch = event => {
    event.preventDefault()
    if (!inputField.current) {
      return
    }
    window.location = `https://search.biodatacatalyst.renci.org/?q=${ inputField.current.value }`
  }

  useEffect(() => {
    if (focusOnMount && inputField.current) {
      inputField.current.focus()
    }
  }, [])

  useEffect(() => {
    // this lets the user press backslash to jump focus to the search box
    const handleKeyPress = event => {
      if (event.keyCode === 220) { // backslash ("\") key 
        if (inputField.current) {
          event.preventDefault()
          inputField.current.select()
          window.scroll({ top: 0 })
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <Form onSubmit={ doSearch } style={ style }>
      <InputGroup>
        <TextInput type="text" ref={ inputField } placeholder="Search study variables by concept" />
          <SearchButton small={ compact }>
            {
              compact ? (
                <MagnifyingGlassIcon size={ 20 } fill="var(--color-white)"/>
              ) : (
                <Fragment>
                  <Hidden xs>
                    Search <Hidden xs sm>BioData Catalyst</Hidden>
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
