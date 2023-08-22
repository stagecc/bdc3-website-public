import React, { useState } from "react";
import {
  ButtonBase, Checkbox, Chip, Collapse, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader,
  Stack, Tooltip, Typography,
} from '@mui/material'
import { ClickAwayListener } from '@mui/base'
import { Tune as FiltersIcon } from '@mui/icons-material'
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
  }


  const id = open ? 'filters-popover' : undefined

  return (
    <ClickAwayListener onClickAway={ () => setOpen(false) }>
      <Stack
        direction="column"
        sx={{
          backgroundColor: '#eee',
          borderRadius: '23px',
          overflow: 'hidden',
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
          '.MuiListSubheader-root': { px: 2, py: 0, backgroundColor: 'transparent' },
          '.clear-filters-button': {
            transition: 'filter 100ms, transform 100ms',
            fontSize: '75%',
            pr: 1,
            color: 'crimson',
          },
          '.clear-filters-button.in': {
            filter: 'opacity(0.4) saturate(0.0)',
            transform: 'translate3d(0, 0, 0)',
          },
          '.clear-filters-button.out': {
            filter: 'opacity(0.0) saturate(0.0)',
            transform: 'translate3d(0, -2rem, 0)',
          },
          '&:hover .clear-filters-button': {
            filter: 'opacity(0.8) saturate(0.5)',
          },
          '.clear-filters-button:hover': {
            filter: 'opacity(1.0) saturate(0.8)',
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

          <ButtonBase
            disableRipple
            disableTouchRipple
            onClick={ handleClickClearFilters }
            className={ activeFilters.length > 0 ? 'clear-filters-button in' : 'clear-filters-button out' }
          >× Clear filters</ButtonBase>
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
