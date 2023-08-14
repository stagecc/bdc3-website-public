import React from "react";
import {
  Box, IconButton, Checkbox, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Stack, Tooltip,
} from '@mui/material'
import { CartPreview } from './cart'
import { CloseIcon as ClearIcon } from '../icons'
import { Link } from '../link'

//

export const SearchSidebar = ({ filters = { }, activeFilters, toggleFilter, resetFilters }) => {
  return (
    <Box sx={{ p: 2, position: 'sticky', top: 120 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={ 2 }
        sx={{ height: '60px' }}
      >
        <Box>Refine Results By:</Box>
      </Stack>
      
      <Divider />

      <List dense disablePadding aria-label="search result filters">
        <ListItem disablePadding secondaryAction={
          activeFilters.length > 0 && (
            <Tooltip title="Clear selections" placement="left">
              <IconButton
                color="primary"
                size="small"
                onClick={ resetFilters }
              >
                <ClearIcon size={ 16 } fill="var(--color-crimson)" />
              </IconButton>
            </Tooltip>
          )
        }>
          <ListItemText primary="Result Type" sx={{ py: 1 }}/>
        </ListItem>
        {
          Object.keys(filters)
            .sort((f, g) => f.toLowerCase() < g.toLowerCase() ? -1 : 1)
            .map(f => (
              <ListItem key={ `${ f }_checkbox` } dense disablePadding>
                <ListItemButton onClick={ event => toggleFilter(f) }>
                  <ListItemIcon>
                    <Checkbox
                      disableRipple
                      checked={ filters?.[f] }
                      fontSize="small"
                      sx={{ color: 'var(--color-blueberry)'}}
                    />
                  </ListItemIcon>
                  <ListItemText primary={ f } />
                </ListItemButton>
              </ListItem>
            ))
        }
      </List>

      <br />
      <br />
      
      <CartPreview />

    </Box>
  )
}