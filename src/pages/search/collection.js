import React, { useMemo, useState } from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary,
  Button, Card, CardActionArea, CardContent, CardHeader,
  Collapse, Divider, List, ListItem, ListItemText, Stack, Typography,
} from '@mui/material'
import {
  // Download as DownloadIcon,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material'
import { PageContent } from '../../components/layout'
import { SEO } from '../../components/seo'
import { useSearch } from '../../components/search'
// import { downloadJson } from '../../utils'
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
          mr: 2,
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

const ContentsSectionAccordion = ({ title, children, open }) => {
  return (
    <Accordion
      elevation={ 0 }
      expanded={ open }
    >
      <AccordionSummary
        expandIcon={ <ExpandIcon sx={{ fontSize: '90%', }}/> }
        aria-controls={ `${ title }-content-section` }
        id={ `${ title }-header` }
        sx={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          '.MuiAccordionSummary-expandIconWrapper': {
            transform: 'rotate(-90deg)',
          },
          '.MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(0deg)',
          },
          '.MuiAccordionSummary-content': {
            cursor: 'default',
            marginLeft: '8px',
          },
          '.MuiAccordionDetails-root': {
            p: 0,
          }
        }}
      >
        <Typography>{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails className="details">
        { children ?? <Typography paragraph className="details none">None selected.</Typography> }
      </AccordionDetails>
    </Accordion>
  )
}

const CollectionPage = () => {
  const { collection } = useSearch()
  const { concepts, studies, variables } = collection.contents
  const [activeIndex, setActiveIndex] = useState(0)

  const visibleContentsSections = useMemo(() => {
    switch (activeIndex) {
      case 2:
        return ['concepts', 'variables']
      case 1:
        return ['studies']
      case 0:
        return ['concepts']
      default:
        return []
    }
  }, [activeIndex])

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

      <Card elevation={ 2 }>
        <CardHeader
          title="Next Steps"
          titleTypographyProps={{ align: 'center' }}
        />
        
        <Divider />

        <Stack direction="row">
          <CardContent sx={{ p: 0, flex: 1 }}>
            <ContentsSectionAccordion title="Concepts" open={ visibleContentsSections.includes('concepts') }>
              <List dense>
                {
                  concepts.map(({ id, name, type, description }) => (
                    <ListItem key={ `contents-concepts-${ id }` }>
                      <ListItemText primary={ name } secondary={ id } />
                    </ListItem>
                  ))
                }
              </List>
            </ContentsSectionAccordion>
            
            <Divider />

            <ContentsSectionAccordion title="Studies" open={ visibleContentsSections.includes('studies') }>
              <List dense>
                {
                  studies.map(({ id, name, url, source }) => (
                    <ListItem key={ `contents-studies-${ id }` }>
                      <ListItemText primary={ name } secondary={ id } />
                    </ListItem>
                  ))
                }
              </List>
            </ContentsSectionAccordion>
            
            <Divider />

            <ContentsSectionAccordion title="Variables" open={ visibleContentsSections.includes('variables') }>
              <List dense>
                {
                  variables.map(({ id, name, description, url }) => (
                    <ListItem key={ `contents-variables-${ id }` }>
                      <ListItemText primary={ name } secondary={ id } />
                    </ListItem>
                  ))
                }
              </List>
            </ContentsSectionAccordion>
          </CardContent>

          <Divider flexItem orientation="vertical" />

          <CardContent sx={{ flex: 3 }}>
            <Stack gap={ 2 }>
              {
                NEXT_STEP_OPTIONS.map((option, i) => (
                  <NextStepCard
                    key={ `option-${ option.title }` }
                    title={ option.title }
                    content={ option.content }
                    color={ option.color }
                    data={ option.accessor(collection) }
                    expanded={ i === activeIndex }
                    clickHandler={ handleClickStep(i) }
                  />
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
