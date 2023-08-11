import React from 'react'
import { Box } from '@mui/material'

export const DebugTab = props => {
  return (
    <Box component="pre" sx={{
      fontSize: '75%',
      backgroundColor: '#333',
      color: '#ddd',
      whiteSpace: 'pre-wrap',
      p: 1, m: 0,
    }}>
      { JSON.stringify(props, null, 2) }
    </Box>
  )
}