import React, { Fragment } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { ChevronDownIcon as ExpandIcon } from '../../../icons'
import { Link } from '../../../link'

//

const Variable = ({ description, e_link, id, name, score }) => {
  return (
    <Box sx={{
      borderLeft: '3px solid #dde',
      px: 2,
    }}>
      <Typography>
        { name } - <Link to={ e_link }>{ id }</Link>
      </Typography>
      <Typography paragraph>{ description }</Typography>
    </Box>
  )
}

export const StudiesTab = ({ studies }) => {
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
        p: 2,
      },
    }}>
      { 
        studies.length ? studies.map((study, i) => (
          <Accordion
            key={ `${ i }-${ study.id }` }
            defaultExpanded={ i === 0 }
            elevation={ 0 }
            disableGutters
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
                  {' '}--{' '}
                  <Link
                    to={ study.c_link }
                    onClick={ event => event.stopPropagation() /* prevent accordion expand/collapse on link click */ }
                  >{ study.c_id }</Link>
                </Typography>
                <Typography>{ study.elements.length } variables</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className="accordion-details">
              {
                study.elements
                  .sort((e, f) => e.name.toLowerCase() < f.name.toLowerCase() ? -1 : 1)
                  .map(el => <Variable key={ `${ study.id }_${ el.id }` } { ...el } />)
              }
            </AccordionDetails>
          </Accordion>
        )) : <Typography>No studies!</Typography>
      }
    </Box>
  )
}