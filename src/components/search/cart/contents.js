import React from 'react'
import { Box } from '@mui/material'
import { useSearch } from '../context'

export const CartContents = () => {
  const { cart } = useSearch()

  return (
    <Box>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <button onClick={ () => cart.clear() }>clear cart</button>
    </Box>
  )
}