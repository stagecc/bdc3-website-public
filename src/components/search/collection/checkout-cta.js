import React from 'react'
import { navigate } from 'gatsby'
import {
  Button, Stack, Typography,
} from '@mui/material'
import {
  ArrowForward as NextIcon,
} from '@mui/icons-material'

export const CheckoutCta = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        '.next-button': {
          borderRadius: '21px',
        },
      }}
    >
      <Typography paragraph align="center" color="secondary" sx={{ fontStyle: 'italic' }}>
        <strong>Finished Selecting Items?</strong><br />
      </Typography>
      <Button
        variant="contained"
        size="large"
        endIcon={ <NextIcon /> }
        onClick={ () => navigate('/search/collection') }
        className="next-button"
      >Next</Button>
    </Stack>
  )
}

