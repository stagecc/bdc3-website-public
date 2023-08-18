import React, { Fragment, useEffect, useMemo, useState } from 'react'
import {
  Card, CardActions, CardContent, CardHeader, Collapse, Divider,
  IconButton, List, ListItem, ListItemText, ListSubheader, Tooltip,
} from '@mui/material'
import { BookmarkBorder as CollectionIcon } from '@mui/icons-material'
import { useSearch } from './context'
import { Subsubheading } from '../typography'
import { Link } from '../link'
import {
  ChevronDownIcon as ExpandIcon,
  ChevronUpIcon as CollapseIcon,
  CloseIcon as DeleteIcon,
  DeleteIcon as ClearCollectionIcon,
} from '../icons'

//

const textOverflowStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

export const CartPreview = () => {
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
      '.MuiCardContent-root': { p: 0, mb: 1 },
      '.MuiCardActions-root': {
        p: 2, pr: 1,
        display: 'flex',
        justifyContent: 'space-between',
      },
      '.MuiCollapse-root': { backgroundColor: '#f6f6f9' },
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
        avatar={ <CollectionIcon color="secondary" /> }
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

      <Divider />
      
      <CardContent>
        <List dense>
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

      <Divider />
      
      <CardActions>
        <Link to="/search/collection">View Collection</Link>

        <Tooltip title="Empty Collection" placement="left">
          <IconButton onClick={ () => cart.clear() } className="clear-collection-button">
            <ClearCollectionIcon size={ 24 } fill="var(--color-crimson)" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}