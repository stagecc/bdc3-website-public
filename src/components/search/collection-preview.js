import React, { Fragment, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider,
  IconButton, List, ListItem, ListItemText, ListSubheader, Tooltip, Typography,
} from '@mui/material'
import {
  BookmarkBorder as CollectionIcon,
  Send as NextStepsIcon,
} from '@mui/icons-material'
import { useSearch } from './context'
import {
  ChevronDownIcon as ExpandIcon,
  ChevronUpIcon as CollapseIcon,
  CloseIcon as DeleteIcon,
} from '../icons'

//

const textOverflowStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

export const CollectionPreview = () => {
  const { cart } = useSearch()
  const [expanded, setExpanded] = useState(false)

  const clickToggleExpand = () => {
    setExpanded(!expanded)
  }

  const handleClickRemoveFromCart = (type, id) => () => {
    cart.remove(type, id)
  }

  useEffect(() => {
    if (cart.count !== 0) {
      return
    }
    setExpanded(false)
  }, [cart.count])

  return (
    <Card sx={{
      '.MuiCardContent-root': { p: 0 },
      '.contents .MuiCollapse-root': { backgroundColor: '#f6f6f9' },
      '.MuiCardActions-root': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2, py: 3,
      },
      '.clear-collection-button': {
        filter: 'opacity(0.5)',
        transition: 'filter 250ms',
        '&:hover': { filter: 'opacity(1.0)' },
      }
    }}>
      <CardHeader
        title="Collection"
        subheader={ `${ cart.count } item${ cart.count === 1 ? '' : 's' }` }
        titleTypographyProps={{ color: 'secondary' }}
        avatar={ <CollectionIcon size="large" color="secondary" /> }
      />

      <Divider />
      
      <CardContent>
        <List dense className="contents">
          {
            Object.keys(cart.contents).map(key => (
              <Fragment>
                <ListSubheader key={ `cart-${ key }` } color="secondary">
                  { cart.contents[key].length } { key }
                </ListSubheader>
                <Collapse in={ expanded } timeout="auto" unmountOnExit>
                  {
                    cart.contents[key].map(item => (
                      <ListItem
                        key={ `cart-${ key }-${ item.id }` }
                        secondaryAction={
                          <Tooltip title="Remove from Collection" placement="left">
                            <IconButton
                              aria-label="Remove from Collection"
                              onClick={ handleClickRemoveFromCart(key, item.id) }
                            ><DeleteIcon size={ 14 } fill="var(--color-crimson)" /></IconButton>
                          </Tooltip>
                        }
                      ><ListItemText
                        primary={ ` • ${ item.name }` }
                        secondary={ item.id }
                        primaryTypographyProps={{ sx: { fontWeight: '500', ...textOverflowStyle } }}
                        secondaryTypographyProps={{ sx: { pl: 1 } }}
                      /></ListItem>
                    ))
                  }
                </Collapse>
              </Fragment>
            ))
          }
        </List>
      </CardContent>

      <Collapse in={ expanded && cart.count !== 0 } timeout="auto">
        <Divider />
        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography paragraph align="center" color="secondary" sx={{ fontStyle: 'italic' }}>
            <strong>Find everything?</strong><br />
            Click below to continue with your search & analysis!
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={ <NextStepsIcon /> }
            onClick={ () => navigate('/search/collection') }
          >Next Steps</Button>
        </CardActions>
      </Collapse>
      
      <Divider />
      <Tooltip title={ `${ expanded ? 'Hide' : 'Show' } Collection Details` } placement="bottom">
        <Button fullWidth onClick={ clickToggleExpand } color="secondary" disabled={ cart.count === 0 }>
          {
            expanded
              ? <CollapseIcon size={ 24 } fill="var(--color-eggplant-dark)" />
              : <ExpandIcon size={ 24 } fill="var(--color-eggplant-dark)" />
          }
        </Button>
      </Tooltip>
    </Card>
  )
}