import React, { useState } from "react";
import {
  Card, CardContent, CardHeader, Checkbox, Collapse, Divider, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip,
} from '@mui/material'
import { CloseIcon as ClearIcon } from '../icons'
import { Tune as FiltersIcon } from '@mui/icons-material'
import {
  ChevronDownIcon as ExpandIcon,
  ChevronUpIcon as CollapseIcon,
} from '../icons'

//

export const FiltersCard = ({ filters = { }, activeFilters, toggleFilter, resetFilters }) => {
  const [expanded, setExpanded] = useState(false)

  const clickToggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{
      '.MuiListItemButton-root': { px: 1 },
      '.MuiListSubheader-root': { px: 2, py: 1 },
    }}>
      <CardHeader
        title="Refine Results"
        titleTypographyProps={{ color: 'secondary' }}
        avatar={ <FiltersIcon color="secondary" /> }
        action={ 
          <IconButton onClick={ clickToggleExpand }>
            {
              expanded
                ? <CollapseIcon size={ 24 } fill="#333" />
                : <ExpandIcon size={ 24 } fill="#333" />
            }
          </IconButton>
        }
      />

      <Collapse in={ expanded }>

        <Divider />

        <CardContent>
          <List dense disablePadding aria-label="search result filters">
            <ListSubheader className="list-subheader">
              <span>Result Type</span>
              {
                activeFilters.length > 0 && (
                  <Tooltip title="Clear selections" placement="left">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={ resetFilters }
                    ><ClearIcon size={ 16 } fill="var(--color-crimson)" /></IconButton>
                  </Tooltip>
                )
              }
            </ListSubheader>
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
                          size="small"
                        />
                      </ListItemIcon>
                      <ListItemText primary={ f } />
                    </ListItemButton>
                  </ListItem>
                ))
            }
          </List>
        </CardContent>
      </Collapse>
    </Card>
  )
}
