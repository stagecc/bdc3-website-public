import React, { Fragment, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader,
  Collapse, Divider, Grid, IconButton, Stack, Step, Stepper, StepLabel, Typography, useTheme,
} from '@mui/material'
import {
  KeyboardArrowLeft as BackIcon,
  Download as DownloadIcon,
  KeyboardArrowRight as ForwardIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material'
import { PageContent } from '../../components/layout'
import { SEO } from '../../components/seo'
import { useSearch } from '../../components/search'
import { downloadJson } from '../../utils'
import { Link } from '../../components/link'


const NEXT_STEP_OPTIONS = [
  {
    title: 'Check Access',
    content: (
      <Typography>
        Take your study accession IDs of interest and visit
        the <Link to="https://gen3.biodatacatalyst.nhlbi.nih.gov/discovery">BDC Discovery Page</Link> to
        determine which datasets are accessible to you and which require additional permissions to work with.
      </Typography>
    ),
    color: '#efece3',
    accessor: collection => collection.contents.studies.map(study => study.id),
  },
  {
    title: 'Build a Cohort within a Set of Studies',
    content: (
      <Typography>
        Take your study accession IDs of interest and continue your data discovery journey
        by <Link to="https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login">building cohorts across datasets</Link>.
      </Typography>
    ),
    color: '#ece3ef',
    accessor: collection => collection.contents.studies.map(study => study.id),
  },
  {
    title: 'Build a Cohort around a Concept of Interest',
    content: (
      <Typography>
        Take the concept or variable results of interest
        to <Link to="https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login">build cohorts</Link> with them.
      </Typography>
    ),
    color: '#e3efec',
    accessor: collection => [...collection.contents.studies.map(concept => concept.id), ...collection.contents.variables.map(variable => variable.id)],
  },
  {
    title: 'Begin Analysis',
    content: (
      <Typography>
        Use a <Link to="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/">secure, collaborative workspace</Link> to
        analyze genomic data at scale. Build workflows for repeatable and reusable analysis, or use Jupyterlab or
        an Rstudio notebook to quickly and easily start working with your data.
      </Typography>
    ),
    color: '#e3ecef',
    accessor: () => [],
  },
]

const NextStepCard = ({ title, content, color = '#eee', clickHandler, data, expanded }) => {
  const { collection } = useSearch()

  return (
    <Card
      className="next-step-card"
      sx={{
        height: '100%',
        backgroundColor: color,
        '.MuiCardHeader-root': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.MuiCardHeader-title': { },
        '.MuiCardHeader-action': {
          alignSelf: 'center',
        },
        '.MuiCardContent-root': {
          p: 4,
          backgroundColor: '#fff6',
          lineHeight: 1.5,
        },
        '.MuiCardActionArea-root': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
      }}
    >
      <CardActionArea onClick={ clickHandler }>
        <CardHeader
          title={ title }
          action={ <ExpandIcon /> }
        />
      </CardActionArea>
      <Collapse in={ expanded }>
        <CardContent>
          { content }

          {
            data && (
              <ul>
                {
                  data.map((d ,i) => <li key={ `${ title }-data-${ i }` }>{ d }</li>)
                }
              </ul>
            )
          }
        </CardContent>

        <CardContent
          component={ Stack }
          justifyContent="center"
          alignItems="center"
          sx={{ '.MuiButton-root': { width: '50%', maxWidth: '300px', p: 2, m: 4 } }}
        >
          <Button size="large" variant="contained" fullWidth>Proceed</Button>
        </CardContent>
      </Collapse>
    </Card>
  )
}

//

const CollectionContentsSection = ({ title, children, className = '' }) => {
  return (
    <CardContent className={ className } sx={{
      p: 0,
      '&.empty': {
        backgroundColor: '#eee',
        filter: 'opacity(0.75)',
      },
      '.title': { flex: '0 0 140px', p: 2 },
      '.body': { flex: 1 },
      '.MuiStack-root': { m: 0 },
      '.details': {
        color: '#666',
      },
      '.details.none': { m: 2 },
    }}>
      <Typography variant="h6" className="title">{ title }</Typography>
      <Box className="body">
        { children }
      </Box>
    </CardContent>
  )
}

const CollectionItemAccordion = ({ type, id, title, children }) => {
  const { collection } = useSearch()

  return (
    <Accordion
      elevation={ 0 }
      disableGutters
      sx={{
        pt: 1,
        '&.MuiAccordion-root:before': { backgroundColor: '#fff' }, // removes lines between consecutive accordions
        '.MuiCollapse-root': {
          position: 'relative',
          '.MuiAccordionActions-root': {
            transition: 'filter 250ms',
            filter: 'opacity(0.1) saturate(0.25)',
          },
          '&:hover .MuiAccordionActions-root': {
            filter: 'opacity(0.5) saturate(0.5)',
            '&:hover': {
              filter: 'opacity(1.0) saturate(1.0)',
            },
          },
        },
        '.MuiAccordionDetails-root': {
          m: 1, mt: 0,
          backgroundColor: '#f3f6f9',
          borderRadius: '4px',
        },
        '.MuiAccordionActions-root': {
          position: 'absolute', bottom: '16px', right: '16px',
        },
        '.MuiAccordionSummary-expandIconWrapper': {
          transition: 'filter 150ms',
          filter: 'opacity(0.25) saturate(0.0)',
        },
        '&:hover .MuiAccordionSummary-expandIconWrapper': {
          filter: 'opacity(0.75) saturate(0.1)',
        },
      }}
    >
      <AccordionSummary
        expandIcon={ <ExpandIcon /> }
        aria-controls={ `${ id }-content` }
        id={ `${ id }-header` }
      >
        <Typography>{ title }</Typography>
      </AccordionSummary>
      <AccordionActions>
        <IconButton
          size="small"
          color="warning"
          onClick={ () => collection.remove(type, id) }
        ><DeleteIcon fontSize="small" /></IconButton>
      </AccordionActions>
      <AccordionDetails className="details">
        { children }
      </AccordionDetails>
    </Accordion>
  )
}

const CollectionContents = () => {
  const { collection } = useSearch()
  const { concepts, studies, variables } = collection.contents

  return (
    <Fragment>
      <CollectionContentsSection
        title="Concepts"
        className={ !concepts.length ? 'empty' : '' }
      >
        {
          concepts.length ? concepts.map(({ id, name, type, description }, i) => (
            <CollectionItemAccordion
              key={ `accordion-${ id }` } 
              type="concepts"
              id={ id }
              title={ `${ i + 1 }. ${ name }` }
            >
              <Typography>
                • id: { id } <br />
                • type: { type } <br />
                • description: { description }
              </Typography>
            </CollectionItemAccordion>
          )) : <Typography paragraph className="details none">None selected.</Typography>
        }
      </CollectionContentsSection>
      
      <Divider />

      <CollectionContentsSection
        title="Studies"
        className={ !studies.length ? 'empty' : '' }
      >
        {
          studies.length ? studies.map(({ id, name, url, source }, i) => (
            <CollectionItemAccordion
              key={ `accordion-${ id }` } 
              type="studies"
              id={ id }
              title={ `${ i + 1 }. ${ name }` }
            >
              <Typography>
                • source: { source } <br />
                • link: <Link to={ url }>{ id }</Link>
              </Typography>
            </CollectionItemAccordion>
          )) : <Typography paragraph className="details none">None selected.</Typography>
        }
      </CollectionContentsSection>
      
      <Divider />

      <CollectionContentsSection
        title="Variables"
        className={ !variables.length ? 'empty' : '' }
      >
        {
          variables.length ? variables.map(({ id, name, description, url }, i) => (
            <CollectionItemAccordion
              key={ `accordion-${ id }` } 
              type="variables"
              id={ id }
              title={ `${ i + 1 }. ${ name }` }
            >
              <Typography>
                • description: { description } <br />
                • link: <Link to={ url }>{ id }</Link>
              </Typography>
            </CollectionItemAccordion>
          )) : <Typography className="details none">None selected.</Typography>
        }
      </CollectionContentsSection>
    </Fragment>
  )
}

const CollectionPage = () => {
  const { collection } = useSearch()
  const { concepts, studies, variables } = collection.contents
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClickStep = newIndex => () => {
    setActiveIndex(newIndex)
  }

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Collection - Semantic Search"
        description="Collection - BioData Catalyst semantic search provided by Dug"
      />

      <Typography hidden variant="h1">Semantic Search: Collection</Typography>

      <br />

      <Card
        elevation={ 3 }
        sx={{
          '.MuiCardActions-root': {
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            '.MuiButton-root.MuiButton-sizeLarge': {
              minHeight: '75px',
            },
          },
        }}
      >
        <CardHeader
          title="Next Steps"
          titleTypographyProps={{ align: 'center' }}
        />
        
        <Divider />

        <Stack direction="row">
          <CardContent sx={{ flex: 1, }}>
            <CollectionContents />
          </CardContent>

          <Divider flexItem orientation="vertical" />

          <CardContent sx={{ flex: 2, }}>
            <Stack gap={ 2 }>
              {
                NEXT_STEP_OPTIONS.map((option, i) => (
                  <Step key={ `option-${ option.title }` }>
                    <NextStepCard
                      title={ option.title }
                      content={ option.content }
                      color={ option.color }
                      data={ option.accessor(collection) }
                      expanded={ i === activeIndex }
                      clickHandler={ handleClickStep(i) }
                    />
                  </Step>
                ))
              }
            </Stack>
          </CardContent>
        </Stack>


      </Card>

      <br />

    </PageContent>
  );
}

export default CollectionPage;
