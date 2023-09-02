import React, { Fragment, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader,
  Divider, Grid, IconButton, Stack, Step, Stepper, StepLabel, Typography, useTheme,
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

//

const CheckoutContext = React.createContext({ })
const useCheckout = () => React.useContext(CheckoutContext)

//

const services = [
  {
    title: 'Check Access',
    content: 'Log in to dbGaP with ERA Commons to determine access account voluptate minim dolore voluptate est qui adipisicing velit mollit et deserunt commodo ad laboris non consectetur.',
    color: '#efece3',
  },
  {
    title: 'Build a Cohort',
    content: 'By building a cohort, Lorem ipsum magna aliqua adipisicing dolore ullamco est magna reprehenderit laborum anim est nisi elit.',
    color: '#ece3ef',
  },
  {
    title: 'Begin Analysis',
    content: 'Utilize Seven Bridges to start your analysis, laboris ad magna sunt in adipisicing deserunt occaecat nulla magna dolore laboris irure esse ex adipisicing sunt laborum amet ex.',
    color: '#e3efec',
  },
  {
    title: 'Continue Search',
    content: 'Find more data with PIC-SURE or Gen3, eu minim sint proident magna cupidatat sit dolore exercitation veniam pariatur minim sunt est culpa.',
    color: '#e3ecef',
  },
]

// REVIEW SELECTIONS step

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
      <Stack direction="row">
        <Typography variant="h6" className="title">{ title }</Typography>
        <Divider orientation="vertical" flexItem />
        <Box className="body">
          { children }
        </Box>
      </Stack>
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
          position: 'absolute', top: 0, right: '16px',
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

const ReviewStep = () => {
  const{ goToNextStep } = useCheckout()
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

      <Divider />
      
      <CardActions>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          startIcon={ <BackIcon /> }
          onClick={ () => navigate(-1) }
        >Return to Search</Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          endIcon={ <ForwardIcon /> }
          onClick={ goToNextStep }
          disabled={ collection.count === 0 }
        >Next</Button>
      </CardActions>
    </Fragment>
  )
}

const DownloadStep = () => {
  const { collection } = useSearch()
  const{ goToPreviousStep, goToNextStep } = useCheckout()

  const handleClickDownloadAsJson = event => {
    event.preventDefault()
    const timestamp = new Date().toISOString()
    downloadJson(collection.contents, `BDC-Collection_${ timestamp }.json`)
  }

  return (
    <Fragment>
      <CardContent>
        <Box sx={{
          maxWidth: '500px',
          margin: 'auto',
          my: 4,
          '.download-button': {
            borderRadius: '18px',
            my: 4,
          },
        }}>
          <Typography paragraph align="center">
            Your selections here will be useful in the next steps of your research.
            Download your selections in JSON format now.
            <br /><br />
            <Button
              variant="contained"
              color="info"
              startIcon={ <DownloadIcon /> }
              onClick={ handleClickDownloadAsJson }
              className="download-button"
              disabled={ collection.count === 0 }
            >Download Selections</Button>
            <br /><br />
            Proceed to the next step to learn how to use your
            selections to continue your research.
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardActions>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          startIcon={ <BackIcon /> }
          onClick={ goToPreviousStep }
        >Back</Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          endIcon={ <ForwardIcon /> }
          onClick={ goToNextStep }
          disabled={ collection.count === 0 }
        >Next</Button>
      </CardActions>
    </Fragment>
  )
}

// NEXT STEPS step

const NextStepCard = ({ title, content, color = '#eee', onClick }) => {
  return (
    <Card
      className="next-step-card"
      sx={{
        height: '100%',
        backgroundColor: color,
        '.MuiCardHeader-root': {
          minHeight: '120px',
        },
        '.MuiCardHeader-title': {
          fontSize: '1.8rem',
          textAlign: 'center',
        },
        '.MuiCardContent-root': {
          p: 6,
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
      <CardActionArea onClick={ onClick }>
        <CardHeader title={ title } />
        <Divider />
        <CardContent sx={{ height: '100%' }}>
          { content }
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const NextSteps = () => {
  const{ goToPreviousStep } = useCheckout()

  return (
    <Fragment>
      <CardContent>
        <Grid container spacing={ 2 }>
          {
            services.map(({ title, content, color }) => (
              <Grid item
                key={ `service-${ title }` }
                xs={ 12 } md={ 6 }
              >
                <NextStepCard
                  title={ title }
                  content={ content }
                  color={ color }
                  onClick={ console.log }
                />
              </Grid>
            ))
          }
        </Grid>
      </CardContent>

      <Divider />

      <CardActions>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          startIcon={ <BackIcon /> }
          onClick={ goToPreviousStep }
          sx={{ backgroundColor: '#fff', minHeight: '75px' }}
        >Back</Button>
      </CardActions>
    </Fragment>
  )
}

//

const STEPS = [
  { title: 'Confirm Selections', Component: ReviewStep },
  { title: 'Download Selections', Component: DownloadStep },
  { title: 'Next Steps', Component: NextSteps },
]

//

const StepIndicator = ({ activeIndex }) => {
  const theme = useTheme()

  return (
    <Stepper
      activeStep={ activeIndex }
      sx={{
        m: 4,
        '.MuiStepLabel-label.Mui-completed': {
          color: theme.palette.secondary.dark,
        },
        '.MuiStepLabel-iconContainer.Mui-completed svg': {
          fill: theme.palette.secondary.main,
        },
        '.MuiStepLabel-label.Mui-active': {
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        },
        '.MuiStepLabel-label.Mui-disabled': {
        },
      }}
    >
      {
        STEPS.map(step => (
          <Step key={ `step-${ step.title }` }>
            <StepLabel>{ step.title }</StepLabel>
          </Step>
        ))
      }
    </Stepper>
  )
}

//

const CollectionPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const goToPreviousStep = () => setCurrentStep((currentStep + STEPS.length - 1) % STEPS.length)
  const goToNextStep = () => setCurrentStep((currentStep + 1) % STEPS.length)

  return (
    <CheckoutContext.Provider value={{ goToPreviousStep, goToNextStep }}>
      <PageContent width="95%" maxWidth="800px" center gutters>
        <SEO
          title="Collection - Semantic Search"
          description="Collection - BioData Catalyst semantic search provided by Dug"
        />

        <Typography hidden variant="h1">Semantic Search: Collection</Typography>

        <StepIndicator activeIndex={ currentStep } />
          
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
            title={ STEPS[currentStep].title }
            titleTypographyProps={{ align: 'center' }}
          />
          
          <Divider />

          { STEPS.map(({ Component}, i) => currentStep === i && <Component key={ `step-${ i }` } />) }
        </Card>

        <br />


      </PageContent>
    </CheckoutContext.Provider>
  );
}

export default CollectionPage;
