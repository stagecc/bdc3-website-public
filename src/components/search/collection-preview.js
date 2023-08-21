import React, { Fragment, useEffect, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider,
  IconButton, List, ListItem, ListItemText, ListSubheader, Tooltip, Typography,
} from '@mui/material'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple'
import {
  BookmarkBorder as CollectionIcon,
  Send as NextStepsIcon,
  ExpandLess as CollapseIcon,
  ExpandMore as ExpandIcon,
  Delete as DeleteIcon,
  Remove as HandleIcon,
} from '@mui/icons-material'
import { useSearch } from './context'

//

const textOverflowStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

// invokes the mui ripple effect on `element`
const triggerRipple = (element, ripple) => {
  const rect = element.getBoundingClientRect();

  ripple.start(
    {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    },
    // when center is true, the ripple doesn't travel to the border of the container
    { center: false },
  );

  setTimeout(() => ripple.stop({ }), 320);
};

export const CollectionPreview = () => {
  const { cart } = useSearch()
  const [expanded, setExpanded] = useState(false)
  const buttonRef = useRef(null)
  const rippleRef = useRef(null)

  const clickToggleExpand = () => {
    setExpanded(!expanded)
  }

  const handleClickRemoveFromCart = (type, id) => () => {
    cart.remove(type, id)
  }

  useEffect(() => {
  }, [cart.count])

  // this effect will be responsible for orchestrating a signal
  // to the user that the contents of their collection have updated.
  useEffect(() => {
    if (cart.count === 0) {
      setExpanded(false)
      return
    }

    if (!rippleRef.current || !buttonRef.current) {
      return
    }
    
    if (expanded) {
      return
    }

    triggerRipple(buttonRef.current, rippleRef.current)
    setExpanded(true)
  }, [cart])

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
      },
      '.list-item .remove-button': {
        transition: 'filter 150ms',
        filter: 'opacity(0.1) saturate(0.0)',
      },
      '.list-item:hover .remove-button': { 
        filter: 'opacity(0.75) saturate(0.1)',
      },
      '.list-item .remove-button:hover': {
        filter: 'opacity(1.0) saturate(1.0)',
      },
      '.next-steps-button': {
        borderRadius: '21px',
      },
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
                        className="list-item"
                        secondaryAction={
                          <Tooltip title="Remove from Collection" placement="top">
                            <IconButton
                              className="remove-button"
                              aria-label="Remove from Collection"
                              onClick={ handleClickRemoveFromCart(key, item.id) }
                              color="warning" size="small"
                            ><DeleteIcon fontSize="small" /></IconButton>
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
            className="next-steps-button"
          >Next Steps</Button>
        </CardActions>
      </Collapse>
      
      <Divider />

      {
        cart.count === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HandleIcon sx={{ margin: 'auto', filter: 'opacity(0.25)' }} /> 
          </Box>
        ) : (
          <Tooltip title={ `${ expanded ? 'Hide' : 'Show' } Collection Details` } placement="bottom">
              <Button
                fullWidth
                onClick={ clickToggleExpand }
                color="secondary"
                ref={ buttonRef }
              >
                { expanded ? <CollapseIcon  /> : <ExpandIcon  /> }
                <TouchRipple ref={ rippleRef } center />
              </Button>
          </Tooltip>
        )
      }
    </Card>
  )
}