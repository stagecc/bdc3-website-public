import React, { useState } from "react";
import {
  ButtonBase, Checkbox, Chip, Collapse, Fade,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader,
  Stack, Typography,
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

  const handleClickClearFilters = event => {
    event.stopPropagation()
    typeFilters.clear()
  }

  return (
    <ClickAwayListener onClickAway={ () => setOpen(false) }>
      <Stack
        direction="column"
        sx={{
          backgroundColor: open ? '#21568a22' : 'transparent',
          '&:hover': { backgroundColor: open ? '#21568a22' : '#21568a11' },
          m: 1,
          my: open ? 2 : 1,
          transition: 'background-color 400ms, margin 300ms ease-out',
          overflow: 'hidden',
          borderRadius: '8px',
          '.top-bar': {
            height: '34px',
            cursor: 'pointer',
            transition: 'padding 200ms',
            p: open ? 1 : 0,
          },
          '.filters-icon': {
            m: 1,
            transition: 'margin 250ms',
          },
          '.chips-container': {
            flex: 1,
          },
          '.MuiChip-root': { },
          '.collapser': {
            backgroundColor: '#fff3'
          },
          '.MuiListItemButton-root': { px: 1 },
          '.MuiListSubheader-root': {
            px: 2,
            py: 0,
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            lineHeight: '36px',
          },
          '.clear-filters-button': {
            transition: 'filter 250ms',
            fontSize: '75%',
            pr: 2,
            color: 'crimson',
            height: '100%',
          },
          '.clear-filters-button.in': { filter: 'opacity(0.4) saturate(0.0)' },
          '.clear-filters-button.out': { filter: 'opacity(0.0) saturate(0.0)' },
          '&:hover .clear-filters-button': { filter: 'opacity(0.8) saturate(0.1)' },
          '.clear-filters-button:hover': { filter: 'opacity(1.0) saturate(0.8)' },
          '.no-filters-note': {
            fontStyle: 'italic',
            fontSize: '75%',
            pl: open ? 1.5 : 0.5,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={ 1 }
          className="top-bar"
          onClick={ handleClickToggleTray }
          role="button"
          aria-label="show filters"
        >
          <FiltersIcon fontSize="small" className="filters-icon" />

          {
            activeFilters.length === 0 ? (
              <Typography
                color="text.disabled"
                className="no-filters-note"
              >Showing everything. Select a filter to refine your results.</Typography>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                gap={ 1 }
                className="chips-container"
              >
                {
                  activeFilters.map(filter => (
                    <Chip
                      key={ `filter-chip-${ filter }` }
                      label={ filter }
                      onDelete={ () => typeFilters.toggle(filter) }
                      color="secondary"
                      size="small"
                    />
                  ))
                }
              </Stack>
            )
          }

          <Fade in={ activeFilters.length !== 0 }>
            <ButtonBase
              disableRipple
              disableTouchRipple
              onClick={ handleClickClearFilters }
              className={ activeFilters.length > 0 ? 'clear-filters-button in' : 'clear-filters-button out' }
            >× Clear filters</ButtonBase>
          </Fade>
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
