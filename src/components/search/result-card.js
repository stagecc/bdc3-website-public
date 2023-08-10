import React from 'react'
import { useSearch } from './context'
import { Box } from '@mui/material'

export const ResultCard = ({ index, result }) => {
  const { setSelectedResult } = useSearch()

  return (
    <Box
      onClick={ () => setSelectedResult(result) }
      sx={{
        position: 'relative',
        border: '1px solid var(--color-blueberry)',
        m: 0,
        filter: 'opacity(0.5)',
        transition: 'filter 250ms',
        minHeight: '300px',
        maxHeight: '300px',
        overflow: 'auto',
        '&:hover': { filter: 'opacity(1.0)' },
        '& .json': {
          fontSize: '75%',
          p: 1,
        },
        '& .index': {
          position: 'absolute',
          top: 0,
          right: 0,
          p: 1,
          color: 'var(--color-blueberry)',
          height: '2rem',
          width: '2rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-blueberry)',
          borderLeft: '1px solid var(--color-blueberry)',
        },
      }}
    >
      <pre className="json">{ JSON.stringify(result, null, 2) }</pre>
      <span className="index">{ index + 1 }</span>
    </Box>
  )
}
