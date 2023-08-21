import React, { useState } from "react";
import {
  Box, Card, CardHeader, Checkbox, Chip, Collapse, Divider, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader,
  Popover, Stack, Tooltip, Typography,
} from '@mui/material'
import { ClickAwayListener } from '@mui/base'
import {
  Close as CloseIcon,
  Close as ClearIcon,
  Tune as FiltersIcon,
} from '@mui/icons-material'
import { useSearch } from './context'

//

export const FiltersTray = () => {
  const { typeFilters } = useSearch()
  const activeFilters = typeFilters.active()
  const [open, setOpen] = useState(false)

  const handleClickToggleTray = (event) => {
    setOpen(!open)
  }

  const handleClickClearFilters = () => {
    typeFilters.clear()
    setOpen(false)
  }


  const id = open ? 'filters-popover' : undefined

  return (
    <ClickAwayListener onClickAway={ () => setOpen(false) }>
      <Stack
        direction="column"
        sx={{
          backgroundColor: '#eee',
          borderRadius: '23px',
          oerflow: 'hidden',
          '.top-bar': {
            p: 1,
          },
          '.collapser': {
            backgroundColor: '#ddd',
            borderBottomLeftRadius: '23px',
            borderBottomRightRadius: '23px',
          },
          '.chips-container': {
            flex: 1,
          },
          '.MuiChip-root': {
            m: 0.5,
          },
          '.MuiListItemButton-root': { px: 1 },
          '.MuiListSubheader-root': { px: 2, py: 1, backgroundColor: 'transparent' },
          '.clear-filters-button': {
            transition: 'filter 250ms',
            filter: 'opacity(0.25) saturate(0.1)',
          },
          '&:hover .clear-filters-button': {
            filter: 'opacity(1.0) saturate(1.0)',
          },
          '.no-filters-note': {
            fontStyle: 'italic',
            m: 1, ml: 2,
            fontSize: '75%',
          },
        }}
      >
        <Stack direction="row" gap={ 1 } className="top-bar">
          <Tooltip title="Filters" placement="top">
            <IconButton
              aria-describedby={ id }
              onClick={ handleClickToggleTray }
              size="small"
              sx={{ flex: '0 0 36px' }}
            ><FiltersIcon fontSize="small" /></IconButton>
          </Tooltip>

          <Stack
            direction="row"
            alignItems="flex-start"
            gap={ 1 }
            className="chips-container"
          >
            {
              activeFilters.length === 0 ? (
                <Typography
                  color="text.disabled"
                  className="no-filters-note"
                >Showing everything. Select a filter to refine your results.</Typography>
              ) : activeFilters.map(filter => (
                <Chip
                  label={ filter }
                  onDelete={ () => typeFilters.toggle(filter) }
                  color="secondary"
                  size="small"
                />
              ))
            }
          </Stack>

          {
            activeFilters.length > 0 && (
              <Tooltip title="Clear Filters" placement="left">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={ handleClickClearFilters }
                ><ClearIcon fontSize="small" /></IconButton>
              </Tooltip>
            )
          }
        </Stack>

        <Collapse in={ open } className="collapser">
          <List dense aria-label="search result filters">
            <ListSubheader>Result Types</ListSubheader>
            {
              Object.keys(typeFilters.filters)
                .sort((f, g) => f.toLowerCase() < g.toLowerCase() ? -1 : 1)
                .map(f => (
                  <ListItem key={ `${ f }_2-checkbox` } disablePadding>
                    <ListItemButton onClick={ () => typeFilters.toggle(f) }>
                      <ListItemIcon>
                        <Checkbox
                          disableRipple
                          checked={ typeFilters.filters?.[f] }
                          size="small"
                          color="secondary"
                        />
                      </ListItemIcon>
                      <ListItemText primary={ f } />
                    </ListItemButton>
                  </ListItem>
                ))
            }
          </List>
        </Collapse>
      </Stack>
    </ClickAwayListener>
  )
}
/*      <Popover
        id={ id }
        open={ open }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Card>
          <CardHeader
            title="Refine Results"
            titleTypographyProps={{ color: 'secondary' }}
          />
          <Divider />
          <List dense aria-label="search result filters">
            <ListSubheader className="list-subheader">Result Type</ListSubheader>
            {
              Object.keys(typeFilters.filters)
                .sort((f, g) => f.toLowerCase() < g.toLowerCase() ? -1 : 1)
                .map(f => (
                  <ListItem key={ `${ f }_checkbox` } disablePadding>
                    <ListItemButton onClick={ () => typeFilters.toggle(f) }>
                      <ListItemIcon>
                        <Checkbox
                          disableRipple
                          checked={ typeFilters.filters?.[f] }
                          size="small"
                        />
                      </ListItemIcon>
                      <ListItemText primary={ f } />
                    </ListItemButton>
                  </ListItem>
                ))
            }
          </List>
        </Card>
      </Popover>*/