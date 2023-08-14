import React, { Fragment, useState } from 'react'
import { Card, CardContent, CardHeader, Collapse, Divider, IconButton, List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import { useSearch } from '../context'
import { Subsubheading } from '../../typography'
import { Link } from '../../link'
import {
  ChevronDownIcon as ExpandIcon,
  ChevronUpIcon as CollapseIcon,
  CloseIcon as DeleteIcon,
} from '../../icons'

//

export const CartPreview = () => {
  const { cart } = useSearch()
  const [expanded, setExpanded] = useState(false)

  const clickToggleExpand = () => {
    setExpanded(!expanded)
  }

  const handleClickRemoveFromCart = (type, id) => () => {
    cart.remove(type, id)
  }

  return (
    <Card sx={{}}>
      <CardHeader
        title="Cart"
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
                <ListSubheader key={ `cart-${ key }` }>
                  { cart.contents[key].length } { key }
                </ListSubheader>
                <Collapse in={ expanded } timeout="auto" unmountOnExit>
                  {
                    cart.contents[key].map(item => (
                      <ListItem
                        key={ `cart-${ key }-${ item.id }` }
                        secondaryAction={
                          <IconButton
                            aria-label="remove from cart"
                            onClick={ handleClickRemoveFromCart(key, item.id) }
                          ><DeleteIcon size={ 14 } fill="var(--color-crimson)" /></IconButton>
                        }
                      >
                        <ListItemText primary={ ` • ${ item.id }` } />
                      </ListItem>
                    ))
                  }
                </Collapse>
              </Fragment>
            ))
          }
        </List>
      </CardContent>

      <Divider />
      
      <CardContent>
        <Link to="/search/cart">Vew cart</Link>
      </CardContent>
    </Card>
  )
}