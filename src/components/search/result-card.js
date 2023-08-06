import React from 'react'
import { useSearch } from './context'
import { Box } from '@mui/material'

export const ResultCard = ({ index, result }) => {
  const { setSelectedResult } = useSearch()

  return (
    <Box
      onClick={ () => setSelectedResult(result) }
      as="pre"
      sx={{
        backgroundColor: '#eee',
        whiteSpace: 'pre-wrap',
        fontSize: '75%',
        overflow: 'auto',
        maxHeight: '300px',
        border: '1px solid var(--color-blueberry)',
        cursor: 'pointer',
        p: 1,
        m: 0,
        filter: 'opacity(0.5)',
        transition: 'filter 250ms',
        '&:hover': {
          filter: 'opacity(1.0)',
        },
        display: 'block',
        position: 'relative',
        '&::after': {
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          content: `"${ index + 1 }"`,
          borderBottom: '1px solid var(--color-blueberry)',
          borderLeft: '1px solid var(--color-blueberry)',
          p: '0.25rem 0.25rem 0.5rem 0.5rem',
        },
    }}
    >{ JSON.stringify(result, null, 1) }</Box>
  )
}
