import React, { Fragment, useState } from 'react'
import { navigate } from 'gatsby'
import {
  Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader,
  Divider, Grid, Stack, Step, Stepper, StepLabel, Typography,
} from '@mui/material'
import {
  KeyboardArrowLeft as BackIcon,
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
  return (
    <Stepper
      activeStep={ activeIndex }
      sx={{
        m: 4,
      }}
    >
      <Step>
        <StepLabel>Confirm Selections</StepLabel>
      </Step>
      <Step>
        <StepLabel>Download</StepLabel>
      </Step>
      <Step>
        <StepLabel>Next Steps</StepLabel>
      </Step>
    </Stepper>
  )
}

//

const ReviewStep = () => {
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
      '.MuiButton-root': {
        minHeight: '75px',
      },
      '.MuiCardActions-root': {
        display: 'flex',
        justifyContent: 'space-between',
      }
    }}>
      <CardHeader title="Review Selections" />

      <Divider />

      <CardContent sx={{
        '.MuiTypography-root.details': {
          p: 1,
          color: '#666',
        },
      }}>
        <Typography variant="h5">Concepts</Typography>
        {
          concepts.length
            ? concepts.map(({ id, name, type, description }, i) => (
              <Fragment key={ `cart-concepts-${ id }` }>
                <Typography>{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  - id: { id } <br />
                  - type: { type } <br />
                  - description: { description }
                </Typography>
              </Fragment>
            ))
          : <Typography paragraph className="details">None selected.</Typography>
        }
        <Divider />
        <Typography variant="h5">Studies</Typography>
        {
          studies.length
            ? studies.map(({ id, name, url, source }, i) => (
              <Fragment key={ `cart-concepts-${ id }` }>
                <Typography>{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  - source: { source } <br />
                  - id/url: <Link to={ url }>{ id }</Link>
                </Typography>
              </Fragment>
            ))
            : <Typography paragraph className="details">None selected.</Typography>
        }
        <Divider />
        <Typography variant="h5">Variables</Typography>
        {
          variables.length
            ? variables.map(({ id, name, description, url }, i) => (
              <Fragment key={ `cart-concepts-${ id }` }>
                <Typography>{ i + 1 }. { name }</Typography>
                <Typography className="details">
                  - description: { description } <br />
                  - id/url: <Link to={ url }>{ id }</Link>
                </Typography>
              </Fragment>
            ))
            : <Typography className="details">None selected.</Typography>
        }
        <Divider />
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
          color="success"
          endIcon={ <ForwardIcon /> }
          onClick={ handleClickDownloadAsJson }
        >
        Confirm Selections</Button>
      </CardActions>
    </Card>
  )
}

//

const DownloadStep = () => {
  return (
    <Card>
      download
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
      </Grid>
    </Box>
  )
}

//

const CollectionPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <PageContent width="95%" maxWidth="1400px" center gutters>
      <SEO
        title="Collection - Semantic Search"
        description="Collection - BioData Catalyst semantic search provided by Dug"
      />

      <Typography variant="h1">Semantic Search: Collection</Typography>

      <Box sx={{
        maxWidth: '800px',
        margin: 'auto',
      }}>
        <StepIndicator activeIndex={ currentStep } />

        { currentStep === 0 && <ReviewStep /> }
        { currentStep === 1 && <DownloadStep /> }
        { currentStep === 2 && <NextSteps /> }
      </Box>

      <button onClick={ () => setCurrentStep((currentStep + 2) % 3) } disabled={ currentStep === 0 }>prev</button>
      <button onClick={ () => setCurrentStep((currentStep + 1) % 3) } disabled={ currentStep === 2 }>next</button>

    </PageContent>
  );
}

export default CollectionPage;
