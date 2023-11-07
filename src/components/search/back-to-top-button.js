import React from 'react'
import { Button, Stack } from '@mui/material'
import { ArrowDropUp as ToTopIcon } from '@mui/icons-material'
import { useScrollPosition }  from '../../hooks'

//

export const BackToTopButton = () => {
  const scrollPosition = useScrollPosition()

  const visible = scrollPosition > 3 * window.innerHeight

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      className={ visible ? 'visible' : 'hidden' }
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 999,
        '.MuiButton-root': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          transition: 'transform 250ms, filter 250ms',
        },
        '&.visible .MuiButton-root': {
          transform: 'translate3d(0, 0, 0)',
          filter: 'opacity(1.0)',
        },
        '&.hidden .MuiButton-root': {
          transform: 'translate3d(0, 100%, 0)',
          filter: 'opacity(0.0)',
        },
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        startIcon={ <ToTopIcon /> }
        onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >back to top</Button>
    </Stack>
  )
}
