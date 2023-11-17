import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Form, InputGroup, TextInput } from '../form'
import { Button } from '../buttons'
import { MagnifyingGlassIcon } from '../icons'
import { useSearch } from './context'

import {
  Fade,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Tooltip,
} from '@mui/material'
import {
  Search as SearchIcon,
  Backspace as ClearQueryIcon,
} from '@mui/icons-material'

//

export const DugForm = ({ focusOnMount = false, slashFocus = false }) => {
  const { doSearch, query } = useSearch()
  const [formQuery, setFormQuery] = useState(query)
  const inputRef = useRef()
  
  const handleChangeFormQuery = event => {
    setFormQuery(event.target.value)
  }

  const handleClickClearQuery = event => {
    setFormQuery('')
    if (!inputRef.current) {
      return
    }
    inputRef.current.focus()
  }

  const handleClickSubmit = event => {
    event.preventDefault()
    doSearch(formQuery)
  }

  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus()
    }
  }, [focusOnMount])

  // this catches in-app user-conducted query changes,
  // like clicking a related concept,
  // and aligns the form's query value with state.
  useEffect(() => {
    setFormQuery(query)
  }, [query])

  useEffect(() => {
    if (!slashFocus) {
      return
    }
    // this lets the user jump focus to the search box
    // with the forward slash "/" key
    const handleKeyPress = event => {
      if (inputRef.current) {
        const inputFocus = inputRef.current.input === document.activeElement
        if (!inputFocus) {
          if (event.key === '/') {
            event.preventDefault()
            inputRef.current.focus()
            inputRef.current.select()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            // Keypress with no associated function has been fired on the page.
            // message.open({
            //   content: `use "/" to focus the search box.`
            // })
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [slashFocus])

  return (
    <Paper
      component="form"
      onSubmit={ handleClickSubmit }
      sx={{
        p: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid transparent',
        backgroundColor: '#eceef3',
        transition: 'background-color 250ms',
        '&:focus-within': {
          backgroundColor: '#eef3f9',
          border: '1px solid #dee3e9',
        },
        borderRadius: '8px',
        '.MuiIconButton-root': { p: 1 },
        '& .clear-button': {
          transition: 'filter 250ms',
          filter: 'opacity(0.25) saturate(0.0)',
        },
        '&:hover .clear-button': { filter: 'opacity(0.5) saturate(0.25)' },
        '&:hover .clear-button:hover': { filter: 'opacity(1.0) saturate(1.0)' },
        '.slash-key': {
          position: 'relative',
          backgroundColor: '#ddd9',
          borderTop: '3px solid #ddd6',
          borderRight: '3px solid #ccc9',
          borderBottom: '3px solid #ccc9',
          borderLeft: '3px solid #ddd6',
          borderRadius: '2px',
          width: '22px', height: '22px',
          ml: 1,
          pointerEvents: 'none',
          '&::after': {
            position: 'absolute',
            left: 0, right: 0,
            top: 0, bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            content: '"/"',
            color: '#6669',
            pt: 0.5,
          },
        },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: 1 }}
        placeholder="Search for BDC studies related to your research (e.g., disease names, diagnoses, etc.)"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={ formQuery }
        onChange={ handleChangeFormQuery }
        inputRef={ inputRef }
        endAdornment={
          <Fragment>
            <Fade in={ !!formQuery }>
              <InputAdornment position="end">
                <Tooltip title="Clear query" placement="left">
                  <IconButton
                    aria-label="clear query"
                    color="primary"
                    size="small"
                    className="clear-button"
                    onClick={ handleClickClearQuery }
                  >
                    <ClearQueryIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            </Fade>
            { slashFocus && <span className="slash-key" /> }
          </Fragment>
        }
      />

      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

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
            <MagnifyingGlassIcon size={ 20 } fill="var(--color-white)"/>
          </SearchButton>
      </InputGroup>
    </Form>
  )
}
