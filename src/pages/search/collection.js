import React, { Fragment, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader,
  Divider, Grid, Stack, Step, Stepper, StepLabel, Typography, useTheme,
} from '@mui/material'
import {
  KeyboardArrowLeft as BackIcon,
  Download as DownloadIcon,
  KeyboardArrowRight as ForwardIcon,
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
      '&.empty': {
        backgroundColor: '#eee',
        filter: 'opacity(0.75)',
      },
      '.title': { flex: '0 0 100px' },
      '.body': { flex: 1 },
      '& summary': {
        cursor: 'pointer',
        p: 1,
      },
      '.MuiStack-root': {
        mx: 2,
      },
      '.MuiTypography-root.details': {
        p: 1, pl: 3,
        color: '#666',
      },
      '.MuiTypography-root.details.none': {
        m: 0,
      },
    }}>
      <Stack direction="row">
        <Typography variant="h6" className="title">{ title }</Typography>
        <Box className="body">
          { children }
        </Box>
      </Stack>
    </CardContent>
  )
}

const ReviewStep = () => {
  const{ goToNextStep } = useCheckout()
  const { collection } = useSearch()
  const { concepts, studies, variables } = collection.contents

  return (
    <Fragment>
      <CollectionContentsSection title="Concepts" className={ !concepts.length ? 'empty' : '' }>
        {
          concepts.length
            ? concepts.map(({ id, name, type, description }, i) => (
              <details key={ `collection-concepts-${ id }` }>
                <Typography component="summary">{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  • id: { id } <br />
                  • type: { type } <br />
                  • description: { description }
                </Typography>
              </details>
            ))
          : <Typography paragraph className="details none">None selected.</Typography>
        }
      </CollectionContentsSection>
      
      <Divider />

      <CollectionContentsSection title="Studies" className={ !studies.length ? 'empty' : '' }>
        {
          studies.length
            ? studies.map(({ id, name, url, source }, i) => (
              <details key={ `collection-concepts-${ id }` }>
                <Typography component="summary">{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  • source: { source } <br />
                  • link: <Link to={ url }>{ id }</Link>
                </Typography>
              </details>
            ))
            : <Typography paragraph className="details none">None selected.</Typography>
        }
      </CollectionContentsSection>
      
      <Divider />

      <CollectionContentsSection title="Variables" className={ !variables.length ? 'empty' : '' }>
        {
          variables.length
            ? variables.map(({ id, name, description, url }, i) => (
              <details key={ `collection-concepts-${ id }` }>
                <Typography component="summary">{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  • description: { description } <br />
                  • link: <Link to={ url }>{ id }</Link>
                </Typography>
              </details>
            ))
            : <Typography className="details none">None selected.</Typography>
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
            selections to continue your research with.
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
        >Return to Collection</Button>
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
          
        <Card sx={{
          '.MuiCardActions-root': {
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            '.MuiButton-root.MuiButton-sizeLarge': {
              minHeight: '75px',
            },
          },
        }}>
          <CardHeader
            title={ STEPS[currentStep].title }
            titleTypographyProps={{ align: 'center' }}
          />
          
          <Divider />

          { STEPS.map(({ title, Component}, i) => currentStep === i && <Component />) }
        </Card>

        <br />


      </PageContent>
    </CheckoutContext.Provider>
  );
}

export default CollectionPage;
