import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button,
  Card, CardActionArea, CardContent, CardHeader, Collapse,
  Divider, IconButton, List, ListItem, ListItemText, Stack, Typography,
} from '@mui/material'
import {
  CopyAll as CopyIcon,
  Download as DownloadIcon,
  BookmarkBorder as CollectionIcon,
  Bookmark as CollectionIconActive,
  ExpandMore as ExpandIcon,
  ArrowBack as ReturnIcon,
} from '@mui/icons-material'
import { PageContent } from '../../components/layout'
import { SEO } from '../../components/seo'
import { useSearch } from '../../components/search'
import { downloadFile } from '../../utils'
import { Link } from '../../components/link'


const NEXT_STEP_OPTIONS = [
  {
    title: 'Check Your Data Access',
    content: (
      <Typography>
        Click on "Download List" or
        note the study accession IDs of your selections and visit
        the <Link to="https://gen3.biodatacatalyst.nhlbi.nih.gov/discovery">BDC Discovery Page</Link> to
        see if you have data access permissions.
        If you need to request access, follow the instructions
        in <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/data-access/submitting-a-dbgap-data-access-request">BDC Documentation</Link>.
      </Typography>
    ),
    color: '#efece3',
    accessor: collection => collection.contents.studies.map(study => study.id),
    sections: ['studies'],
    url: 'https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login'
  },
  {
    title: 'Build a Cohort',
    content: (
      <Typography>
        Click on "Download List" or
        note the study accession IDs
        and concept or variable results of your selections
        and <Link to="https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login">build cohorts across datasets</Link>.
      </Typography>
    ),
    color: '#ece3ef',
    accessor: collection => [
      ...collection.contents.concepts.map(concept => concept.id),
      ...collection.contents.studies.map(study => study.id),
      ...collection.contents.variables.map(variable => variable.id),
    ],
    sections: ['concepts', 'studies', 'variables'],
    url: 'https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login'
  },
  {
    title: 'Begin Analyzing the Data',
    content: (
      <Typography>
        Use a <Link to="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/">secure, collaborative workspace</Link> to
        analyze data at scale. Build workflows for repeatable and reusable analysis, or use Jupyterlab or
        an Rstudio notebook to quickly and easily start working with your data.
      </Typography>
    ),
    color: '#e3ecef',
    accessor: () => [],
    sections: [],
    url: 'https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/'
  },
]

const DataDisplay = ({ data = [] }) => {
  const [copied, setCopied] = useState(false)


  useEffect(() => {
    const alertTimeout = setTimeout(() => setCopied(false), 3000)
    return () => clearTimeout(alertTimeout)
  }, [copied])

  const handleClickCopy = () => {
    navigator.clipboard.writeText(data.join(', '))
    setCopied(true)
  }

  if (data.length === 0) { return <div /> }

  return (
    <Box
      className={ copied ? 'data copied' : 'data'}
      sx={{
        backgroundColor: '#fff6',
        borderRadius: 1,
        border: '1px solid',
        borderColor: '#fff9',
        transition: 'border-color 250ms',
        p: 2,
        fontFamily: 'monospace',
        minHeight: '64px',
        '.datum': {
          position: 'relative',
          pl: 2,
          lineHeight: 1,
          '&::before': {
            content: '"- "',
            fontFamily: 'monospace',
            lineHeight: 1,
            position: 'absolute',
            left: 0,
            top: 0,
          },
        },
        position: 'relative',
        '.copy-container': {
          position: 'absolute',
          top: '8px',
          right: '8px',
          '.MuiTypography-root': {
            transition: 'filter 250ms',
            filter: 'opacity(1.0) saturate(0.0)',
          },
        },
        '&:hover .copy-container .MuiTypography-root': {
          filter: 'opacity(1.0) saturate(0.0)',
        },
        '&.copied': {
          borderColor: 'var(--color-sea)',
          '.copy-container': {
            '.MuiTypography-root': {
              filter: 'opacity(1.0) saturate(1.0)',
            },
          },
        },
      }}
    >
      {
        data.map(d => (
          <Fragment key={ d }>
            <span className="datum">{ d }</span><br />
          </Fragment>
        ))
      }
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={ 1 }
        className="copy-container"
      >
        <Typography
          variant="caption"
          sx={{ color: 'var(--color-sea)' }}
        >{ copied ? 'Copied!' : 'Copy to clipboard' }</Typography>
        <IconButton
          disabled={ !data.length || copied }
          onClick={ handleClickCopy }
          size="small"
        >
          <CopyIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  )
}

const NextStepCard = ({ clickHandler, color = '#eee', content, data, expanded, title, url }) => {
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
      <CardActionArea onClick={ clickHandler } disabled={ expanded }>
        <CardHeader
          title={ title }
          action={ <ExpandIcon color={ expanded ? 'disabled' : 'secondary' } /> }
        />
      </CardActionArea>
      <Collapse in={ expanded }>
        <CardContent>
          { content }
        </CardContent>
        <CardContent>
          <DataDisplay data={ data } />
        </CardContent>

        <CardContent
          component={ Stack }
          justifyContent="center"
          alignItems="center"
          sx={{ '.MuiButton-root': { width: '50%', maxWidth: '300px', p: 2, m: 4 } }}
        >
          <Button
            size="large"
            variant="contained"
            fullWidth
            href={ url }
          >Proceed</Button>
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
      sx={{
        '*': { cursor: 'default !important', }, // i couldn't seem to make this work on single classes
        '.MuiAccordionSummary-root': {
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: -1,
          filter: open ? 'opacity(1) saturate(1)' : 'opacity(0.5) saturate(0.5)',
          transition: 'filter 250ms 100ms',          
        },
        '.MuiAccordionSummary-expandIconWrapper': { transform: 'rotate(0deg)', ml: 1 },
        '.MuiAccordionSummary-content': { cursor: 'default !important', ml: 1, },
        '.MuiAccordionDetails-root': {
          p: 0,
          pl: 3,
          '& *': { py: 0 },
          '.MuiListItem-root': { py: 0 },
          '.MuiListItemText': { m: 0 },
          '.MuiListItemText-root': { pl: 2 },
        },
      }}
    >
      <AccordionSummary
        expandIcon={ open
          ? <CollectionIconActive color="secondary" />
          : <CollectionIcon color="secondary" />
        }
        aria-controls={ `${ title }-content-section` }
        id={ `${ title }-header` }
        sx={{
        }}
      >
        <Typography color="secondary">{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails className="details">
        {
          React.Children.count(children) > 0 ? children : (
            <Typography
              paragraph
              className="details none"
              sx={{ pl: 4, fontStyle: 'italic', color: 'var(--color-lightgrey)' }}
            >None selected.</Typography>
          )
        }
      </AccordionDetails>
    </Accordion>
  )
}

const CollectionPage = () => {
  const { collection } = useSearch()
  const { concepts, studies, variables } = collection.contents
  const [activeIndex, setActiveIndex] = useState(-1)

  const visibleContentSections = useMemo(() => {
    return activeIndex in NEXT_STEP_OPTIONS
      ? NEXT_STEP_OPTIONS[activeIndex].sections
      : []
  }, [activeIndex])

  useEffect(() => {
    const defaultIndexTimer = setTimeout(() => setActiveIndex(0), 1000)
    return () => clearTimeout(defaultIndexTimer)
  }, [])

  const handleClickStep = newIndex => () => {
    setActiveIndex(newIndex)
  }

  const handleClickDownloadAsJson = event => {
    event.preventDefault()
    const timestamp = new Date().toISOString()
    downloadFile({
      data: JSON.stringify(collection.contents, null, 2),
      fileName: `BDC-Collection_${ timestamp }.json`,
      filetype: 'text/json',
    })
  }

  const handleClickReturnToSearch = () => {
    navigate(-1)
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

        <CardContent sx={{ py: 4, px: { xs: 4, md: 20 } }}>
          <Typography paragraph>
            On this page, find information about your selections that can be used
            to take further actions in the BioData Catalyst ecosystem.
            Note that each of these actions requires
            an <Link to="https://www.era.nih.gov/register-accounts/understanding-era-commons-accounts.htm">eRA Commons ID</Link>.
            You can also download the full list of your selections.
          </Typography>
        </CardContent>
        
        <Divider />

        <Stack direction="row" sx={{
          '.MuiList-root': { p: 0 },
          '.MuiListItem-root.MuiListItem-dense': { py: 0 },
        }}>
          <CardContent sx={{ p: 0, flex: 1 }} component={ Stack }>
            <ContentsSectionAccordion
              title={ `Concepts (${ concepts.length })` }
              open={ visibleContentSections.includes('concepts') }
            >
              { concepts.length > 0 ? (
                <List dense>
                  {
                    concepts.map(({ id, name, type, description }) => (
                      <ListItem key={ `contents-concepts-${ id }` }>
                        <ListItemText primary={ name } secondary={ id } />
                      </ListItem>
                    ))
                  }
                </List>
              ) : null }
            </ContentsSectionAccordion>
            
            <Divider />

            <ContentsSectionAccordion
              title={ `Studies (${ studies.length })` }
              open={ visibleContentSections.includes('studies') }
            >
              { studies.length > 0 ? (
                <List dense>
                  {
                    studies.map(({ id, name, url, source }) => (
                      <ListItem key={ `contents-studies-${ id }` }>
                        <ListItemText primary={ name } secondary={ id } />
                      </ListItem>
                    ))
                  }
                </List>
              ) : null }
            </ContentsSectionAccordion>
            
            <Divider />

            <ContentsSectionAccordion
              title={ `Variables (${ variables.length })` }
              open={ visibleContentSections.includes('variables') }
            >
              { variables.length > 0 ? (
                <List dense>
                  {
                    variables.map(({ id, name, description, url }) => (
                      <ListItem key={ `contents-variables-${ id }` }>
                        <ListItemText primary={ name } secondary={ id } />
                      </ListItem>
                    ))
                  }
                </List>
              ) : null }
            </ContentsSectionAccordion>

            <Divider />

            <Stack
              justifyContent="flex-end"
              alignItems="center"
              sx={{ flex: 1, py: 4 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={ handleClickDownloadAsJson }
                sx={{ gap: 2, maxWidth: '100%', '.button-text': { display: 'inline-block' } }}
              >
                <DownloadIcon size="large" />
                <span className="button-text">Download List</span>
              </Button>
            </Stack>

          </CardContent>

          <Divider flexItem orientation="vertical" />

          <CardContent sx={{ flex: 2 }}>
            <Stack gap={ 2 }>
              {
                NEXT_STEP_OPTIONS.map(({ accessor, ...etc }, i) => (
                  <NextStepCard
                    key={ `option-${ etc.title }` }
                    data={ accessor(collection) }
                    { ...etc }
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

      <Button
        variant="outlined"
        startIcon={ <ReturnIcon /> }
        onClick={ handleClickReturnToSearch }
      >Return to Semantic Search</Button>

    </PageContent>
  );
}

export default CollectionPage;
