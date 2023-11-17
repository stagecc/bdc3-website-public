import React, { Fragment, createContext, useContext, useMemo } from 'react'
import { Badge, Button, IconButton, Stack, Tooltip } from '@mui/material'
import {
  BookmarkBorder as CollectionIcon,
} from '@mui/icons-material'
import { useSearch } from './'

//

export const SidebarToggler = ({ visible = false, onClick, sx }) => {
  const { collection } = useSearch()

  return (
    <Button
      color="secondary"
      size="large"
      variant="text"
      endIcon={
        <Badge badgeContent={ collection.count } color="primary">
          <CollectionIcon />
        </Badge>
      }
      onClick={ onClick }
      sx={ sx }
    >{ visible ? 'Hide Collection' : 'View Collection' }</Button>
  )
}

export const Sidebar = ({ children }) => {
  return (
    <Stack gap={ 4 } sx={{
      position: 'sticky',
      top: 135,
      '.MuiCardContent-root': { p: 0 },
      '.MuiListSubheader-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        lineHeight: '36px',
      },
    }}>
      { children }
    </Stack>
  )
}
