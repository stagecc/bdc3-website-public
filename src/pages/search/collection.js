import React, { Fragment, useEffect, useState } from 'react'
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

const steps = [
  {
    title: 'Check Access',
    content: 'Log in to dbGaP with ERA Commons to determine access account voluptate minim dolore voluptate est qui adipisicing velit mollit et deserunt commodo ad laboris non consectetur ad laboris non consectetur.',
    color: '#efece3',
  },
  {
    title: 'Build a Cohort',
    content: 'By building a cohort, Lorem ipsum magna aliqua adipisicing dolore ullamco est magna reprehenderit laborum anim est nisi elit.',
    color: '#ece3ef',
  },
  {
    title: 'Begin Analysis',
    content: 'Utilize Seven Bridges to start your analysis, laboris ad magna sunt in adipisicing deserunt occaecat nulla magna dolore laboris irure esse ex adipisicing sunt laborum amet ex adipisicing sunt laborum amet.',
    color: '#e3efec',
  },
  {
    title: 'Continue Search',
    content: 'Find more data with PIC-SURE or Gen3, eu minim sint proident magna cupidatat sit dolore exercitation veniam pariatur minim sunt est culpa.',
    color: '#e3ecef',
  },
]

//

const StepIndicator = ({ activeIndex }) => {
  const theme = useTheme()

  return (
    <Stepper
      activeStep={ activeIndex }
      sx={{
        m: 4,
        '.Mui-completed': {
          fontWeight: 'bold',
          color: theme.palette.secondary.dark,
        },
        '.Mui-active': {
          color: theme.palette.primary.main,
        },
        '.Mui-disabled': {
        },
      }}
    >
      <Step>
        <StepLabel>Confirm Selections</StepLabel>
      </Step>
      <Step>
        <StepLabel>Next Steps</StepLabel>
      </Step>
    </Stepper>
  )
}

//

const ReviewStep = () => {
  const{ goToPreviousStep, goToNextStep } = useCheckout()
  const { cart } = useSearch()

  const { concepts, studies, variables } = cart.contents

  const handleClickDownloadAsJson = event => {
    event.preventDefault()
    const timestamp = new Date().toISOString()
    downloadJson(cart.contents, `BDC-Collection_${ timestamp }.json`)
  }

  return (
    <Card sx={{
      height: '100%',
      '.MuiButton-root.MuiButton-sizeLarge': {
        minHeight: '75px',
      },
      '.download-button': {
        borderRadius: '18px',
      },
      '.MuiCardActions-root': {
        display: 'flex',
        justifyContent: 'space-between',
      },
      '& summary': {
        cursor: 'pointer',
        p: 1,
      },
      '.empty': {
        backgroundColor: '#eee',
        filter: 'opacity(0.75)',
      },
      '.MuiTypography-root.details': {
        p: 1,
        color: '#666',
      },
    }}>
      <CardHeader title="Review Selections" />

      <Divider />

      <CardContent className={ !concepts.length ? 'empty' : '' }>
        <Typography variant="h6">Concepts</Typography>
        {
          concepts.length
            ? concepts.map(({ id, name, type, description }, i) => (
              <details key={ `cart-concepts-${ id }` }>
                <Typography component="summary">{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  • id: { id } <br />
                  • type: { type } <br />
                  • description: { description }
                </Typography>
              </details>
            ))
          : <Typography paragraph className="details">None selected.</Typography>
        }
      </CardContent>
      
      <Divider />

      <CardContent className={ !studies.length ? 'empty' : '' }>
        <Typography variant="h6">Studies</Typography>
        {
          studies.length
            ? studies.map(({ id, name, url, source }, i) => (
              <details key={ `cart-concepts-${ id }` }>
                <Typography component="summary">{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  • source: { source } <br />
                  • id/url: <Link to={ url }>{ id }</Link>
                </Typography>
              </details>
            ))
            : <Typography paragraph className="details">None selected.</Typography>
        }
      </CardContent>
      
      <Divider />

      <CardContent className={ !variables.length ? 'empty' : '' }>
        <Typography variant="h6">Variables</Typography>
        {
          variables.length
            ? variables.map(({ id, name, description, url }, i) => (
              <details key={ `cart-concepts-${ id }` }>
                <Typography component="summary">{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  • description: { description } <br />
                  • id/url: <Link to={ url }>{ id }</Link>
                </Typography>
              </details>
            ))
            : <Typography className="details">None selected.</Typography>
        }
      </CardContent>

      <Divider />

      <CardContent>
          <br /><br />
        <Typography paragraph align="center">
          Several of the services available in the next steps can make use of your concept, study, and variable selections here.
          Use the button below to download your selections as JSON. Then proceed to the next step.
          <br /><br />
          <Button
            variant="contained"
            color="info"
            startIcon={ <DownloadIcon /> }
            onClick={ handleClickDownloadAsJson }
            className="download-button"
            disabled={ cart.count === 0 }
          >Download Selections</Button>
          <br /><br />
        </Typography>
      </CardContent>

      <Divider />
      
      <CardActions>
        <Button
          variant="outlined"
          size="large"
          startIcon={ <BackIcon /> }
          onClick={ () => navigate(-1) }
        >Return to Search</Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          endIcon={ <ForwardIcon /> }
          onClick={ goToNextStep }
          disabled={ cart.count === 0 }
        >Next Steps</Button>
      </CardActions>
    </Card>
  )
}

//

const NextStepCard = ({ title, content, color = '#eee', onClick }) => {
  return (
    <Card className="next-step-card" sx={{
      height: '100%',
      backgroundColor: color,
      '.MuiCardHeader-root': {
        minHeight: '150px',
      },
      '.MuiCardHeader-title': {
        fontSize: '2rem',
        textAlign: 'center',
      },
      '.MuiCardActionArea-root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    }}>
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
    <Box>
      <Typography variant="h4">Next Steps</Typography>
      <Grid container spacing={ 4 }>
        {
          steps.map(({ title, content, color }) => (
            <Grid item
              key={ `step-${ title }` }
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
        <Grid item sx={ 12 }>
          <Button
            variant="outlined"
            size="large"
            startIcon={ <BackIcon /> }
            onClick={ () => goToPreviousStep() }
            sx={{ backgroundColor: '#fff' }}
          >Back to Collection</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

//

const STEPS = [
  ReviewStep,
  NextSteps,
]

const CheckoutContext = React.createContext({ })
const useCheckout = () => React.useContext(CheckoutContext)

const CollectionPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const goToNextStep = () => setCurrentStep((currentStep + 1) % 2)
  const goToPreviousStep = () => setCurrentStep((currentStep + 1) % 2)

  return (
    <CheckoutContext.Provider value={{ goToPreviousStep, goToNextStep }}>
      <PageContent width="95%" maxWidth="1400px" center gutters>
        <SEO
          title="Collection - Semantic Search"
          description="Collection - BioData Catalyst semantic search provided by Dug"
        />

        <Typography hidden variant="h1">Semantic Search: Collection</Typography>

        <Box sx={{
          maxWidth: '800px',
          margin: 'auto',
        }}>
          <StepIndicator activeIndex={ currentStep } />

          { STEPS.map((Step, i) => currentStep === i && <Step />) }
        </Box>

      </PageContent>
    </CheckoutContext.Provider>
  );
}

export default CollectionPage;
