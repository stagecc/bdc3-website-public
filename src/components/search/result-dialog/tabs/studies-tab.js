import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Tooltip, Typography } from '@mui/material'
import { ChevronDownIcon as ExpandIcon } from '../../../icons'
import { Link } from '../../../link'
import { useSearch } from '../../'

//

const Variable = ({ description, e_link, id, name, score }) => {
  const { cart } = useSearch()

  const handleClickAddVariableToCart = () => cart.add('variables', { id, name })
  const handleClickRemoveVariableFromCart = () => cart.remove('variables', id)

  return (
    <Box sx={{
      borderLeft: '3px solid #dde',
      px: 2, my: 1,
      '.var-description': { m: 0 },
    }}>
      <Typography>
        { name } :: <Link to={ e_link }>{ id }</Link>
        {' :: '}
        {
          cart.contains('variables', id)
            ? <Tooltip title="Remove from cart" placement="right"><button onClick={ handleClickRemoveVariableFromCart }>-</button></Tooltip>
            : <Tooltip title="Add to cart" placement="right"><button onClick={ handleClickAddVariableToCart }>+</button></Tooltip>
        }
      </Typography>
      <Typography paragraph className="var-description">{ description }</Typography>
    </Box>
  )
}

export const StudiesTab = ({ studies }) => {
  const { cart } = useSearch()

  const handleClickAddStudyToCart = study => event => {
    event.stopPropagation()
    const { c_id: id, c_name: name } = study
    cart.add('studies', { id, name })
  }
  const handleClickRemoveStudyFromCart = study => event => {
    event.stopPropagation()
    cart.remove('studies', study.id)
  }

  return (
    <Box sx={{
      '.accordion-summary': {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        backgroundColor: '#ece9f3',
        '.flex': {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          pr: 2,
        },
      },
      '.accordion-details': {
        backgroundColor: '#fcf9f3',
        px: 2,
      },
    }}>
      { 
        studies.length ? studies.map((study, i) => (
          <Accordion
            key={ `${ i }-${ study.id }` }
            defaultExpanded={ i === 0 }
            elevation={ 0 }
            disableGutters
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              aria-controls={ `${ study.c_id }-content` }
              id={ `${ study.c_id }-heading` }
              expandIcon={ <ExpandIcon size={ 16 } fill="var(--color-blueberry)" /> }
              className="accordion-summary"
            >
              <Box className="flex">
                <Typography>
                  { study.c_name }
                  {' :: '}
                  <Link
                    to={ study.c_link }
                    onClick={ event => event.stopPropagation() /* prevent accordion expand/collapse on link click */ }
                  >{ study.c_id }</Link>
                  {' :: '}
                  {
                    cart.contains('studies', study.c_id)
                      ? <Tooltip title="Remove from cart" placement="right"><button onClick={ handleClickRemoveStudyFromCart(study) }>-</button></Tooltip>
                      : <Tooltip title="Add to cart" placement="right"><button onClick={ handleClickAddStudyToCart(study) }>+</button></Tooltip>
                  }
                </Typography>
                <Typography>{ study.elements.length } variable{ study.elements.length === 1 ? '' : 's' }</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className="accordion-details">
              {
                study.elements
                  .sort((e, f) => {
                    if (e.name.toLowerCase() < f.name.toLowerCase()) { return -1 }
                    if (e.name.toLowerCase() > f.name.toLowerCase()) { return 1 }
                    return e.id < f.id ? -1 : 1
                  })
                  .map(el => <Variable key={ `${ study.id }_${ el.id }` } { ...el } />)
              }
            </AccordionDetails>
          </Accordion>
        )) : (
          <Stack justifyContent="center" alignItems="center">
            <Typography>No associated studies were found!</Typography>
          </Stack>
        )
      }
    </Box>
  )
}