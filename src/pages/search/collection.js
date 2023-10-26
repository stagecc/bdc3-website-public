import React, { useMemo, useState } from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary,
  Button, Card, CardActionArea, CardContent, CardHeader,
  Collapse, Divider, List, ListItem, ListItemText, Stack, Typography,
} from '@mui/material'
import {
  Download as DownloadIcon,
  BookmarkBorder as CollectionIcon,
  Bookmark as CollectionIconActive,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material'
import { PageContent } from '../../components/layout'
import { SEO } from '../../components/seo'
import { useSearch } from '../../components/search'
import { downloadFile } from '../../utils'
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
    sections: ['studies'],
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
    sections: ['studies'],
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
    sections: ['concepts', 'variables'],
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
    sections: [],
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
        expandIcon={ open
          ? <CollectionIconActive color="secondary" />
          : <CollectionIcon color="secondary" />
        }
        aria-controls={ `${ title }-content-section` }
        id={ `${ title }-header` }
        sx={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: 1,
          filter: open ? 'opacity(1) saturate(1)' : 'opacity(0.5) saturate(0.5)',
          transition: 'filter 250ms',
          '.MuiAccordionSummary-expandIconWrapper': { transform: 'rotate(0deg)' },
          '.MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(0deg)' },
          '.MuiAccordionSummary-content': { cursor: 'default' },
          '.MuiAccordionDetails-root': {
            p: 0,
            '& *': { py: 0 },
            '.MuiListItem-root.MuiListItem-dense': { py: 0 },
            '.MuiListItemText-root.MuiListItemText-dense': { m: 0 },
          },
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
              sx={{ pl: 2, fontStyle: 'italic', color: 'grey' }}
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
  const [activeIndex, setActiveIndex] = useState(0)

  const visibleContentSections = useMemo(() => NEXT_STEP_OPTIONS[activeIndex].sections, [activeIndex])

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

        <CardContent sx={{ p: 4 }}>
          <Typography paragraph>
            Sed irure laboris sed ut excepteur officia aute dolor.
            Nisi aute anim pariatur aliqua dolore do cupidatat nulla eiusmod incididunt eu mollit.
            Ad eiusmod amet proident commodo culpa minim sunt occaecat.
            Voluptate dolor irure ullamco eiusmod enim non quis eu proident quis amet anim proident.
          </Typography>
          <Typography paragraph>
            Lorem ipsum ut deserunt officia veniam est sit ad minim voluptate.
            Sunt proident labore culpa do consequat est voluptate labore sint proident in cupidatat culpa sunt in qui adipisicing aliqua.
            Veniam labore magna esse qui ea sit consequat id consequat ut voluptate ad est qui et commodo velit.
            Lorem ipsum ea in magna mollit ullamco officia dolore in amet reprehenderit dolore duis excepteur ut.
            Exercitation pariatur in in id sed minim dolor nisi tempor ex ullamco eiusmod sunt aliquip eu occaecat quis.
            Sed irure laboris sed ut excepteur officia aute dolor.
          </Typography>
        </CardContent>
        
        <Divider />

        <Stack direction="row" sx={{
          '.MuiList-root': { p: 0 },
          '.MuiListItem-root.MuiListItem-dense': { py: 0 },
        }}>
          <CardContent sx={{ p: 0, flex: 1 }} component={ Stack }>
            <ContentsSectionAccordion title="Concepts" open={ visibleContentSections.includes('concepts') }>
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

            <ContentsSectionAccordion title="Studies" open={ visibleContentSections.includes('studies') }>
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

            <ContentsSectionAccordion title="Variables" open={ visibleContentSections.includes('variables') }>
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
                startIcon={ <DownloadIcon /> }
                onClick={ handleClickDownloadAsJson }
              >Download Selections as JSON</Button>
            </Stack>

          </CardContent>

          <Divider flexItem orientation="vertical" />

          <CardContent sx={{ flex: 2 }}>
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
