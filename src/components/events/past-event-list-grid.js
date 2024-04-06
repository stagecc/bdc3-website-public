import React, {Fragment} from "react";
// import { AnimateOnMount } from "../../components/anim";
import { graphql } from "gatsby";
import { Link } from "../link";
import { SEO } from "../seo";
import { Title, Paragraph, Meta, Subsubheading, Subheading, Heading } from "../typography";
import { ButtonLink } from "../buttons";
// import { Container as Grid, Row, Col } from "react-grid-system";
import { Module, PageContent } from "../layout";
import BDCLogo from '../../images/favicon.png'
import { Avatar, Divider, Box, Grid, useMediaQuery, Stack, IconButton } from '@mui/material/';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { useTheme } from '@mui/material/styles';

const PastEventListItem = ({event}) => {
  const {
    title,
    path,
    date,
    display_date,
    time,
    location,
    url,
    externalEvent,
    forum_post
  } = event.node.frontmatter;

  const theme = useTheme();

  return (
    <Fragment>
      {
        useMediaQuery(theme.breakpoints.down("md")) ? 
          <Stack key={title} spacing={0} sx={{marginBottom: '2rem'}} >
              
            <Meta style={{margin: 0, fontWeight: 500}}>{display_date ? display_date : date}</Meta>

            <Subheading eventHeading left noMargin style={{margin: 0, }} >
              <Link to={path}>{title}</Link>
            </Subheading>
            
            {
              !externalEvent &&(
                <Stack direction="row" spacing={3} sx={{}}>
                  <Avatar src={BDCLogo} alt='BDC-hosted event' sx={{
                    width: 20, height: 20,
                    border: '1px solid #c5cfe8',
                  }}/>
                  <Meta noMargin>{" "}hosted by BDC</Meta>
                </Stack>
              )
            }

            {
              forum_post && (
                <Stack direction="row" spacing={3} sx={{}}>
                  <SourceOutlinedIcon sx={{fontSize: '1.2rem'}}/>
                  <Link to={forum_post} noIcon>
                    <Meta noMargin>{" "}View Materials</Meta>
                  </Link>
                </Stack>
              )
            }
          </Stack>
        :
          <Grid container columns={16} key={title} spacing={3} sx={{paddingTop: '1rem'}}>
            <Grid item sm={1}>
              <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '3px' }} >
                {!externalEvent && (
                  <Avatar
                    src={BDCLogo}
                    alt='BDC-hosted event'
                    sx={{
                      width: 18, height: 18,
                      border: '1px solid #c5cfe8'
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Subheading eventHeading style={{margin: 0, fontWeight: 500, color: 'var(--color-grey)'}}>
                {display_date ? display_date : date}
              </Subheading>
            </Grid>
            <Grid item sm={9} sx={{}}>
              <Subheading eventHeading left noMargin style={{margin: 0}}>
                <Link to={path}>{title}</Link>
              </Subheading>
            </Grid>
            <Grid item sm={2}>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                {
                  forum_post && (
                    <Link to={forum_post} noIcon>
                      <IconButton aria-label="view materials">
                        <SourceOutlinedIcon sx={{fontSize: '1.2rem'}}/>
                      </IconButton>
                    </Link>
                  )
                }
              </Box>
            </Grid>
          </Grid>
      }


    </Fragment>
  )
}

export const EventsList = ({ title, events }) => {
  const theme = useTheme();

  return (
    <Module title={title} style={{marginTop: '2.5rem'}}>
      {
        useMediaQuery(theme.breakpoints.down("md")) ?
          <Grid container>
            <Grid item>
              <Heading eventHeading left noMargin>Events</Heading>
            </Grid>
          </Grid>
        :
          <Grid container columns={16} spacing={3}>
            <Grid item sm={1}></Grid>
            <Grid item sm={4}>
              <Heading eventHeading left noMargin>Date</Heading>
            </Grid>
            <Grid item sm={9}>
              <Heading eventHeading left noMargin>Event Page</Heading>
            </Grid>
            <Grid item sm={2}>
              <Heading eventHeading center noMargin>Materials</Heading>
            </Grid>
          </Grid>
      }

      <Divider sx={{margin: '0 0 1rem'}}/>

      {events.length ? (
        events.map((event) => (<PastEventListItem event={event} key={`${event.node.frontmatter.title}-${event.node.frontmatter.date}`}/>))
      ) : (
        <Paragraph center>
          There are no events to display at the moment. Please check back
          soon!
        </Paragraph>
      )}
    </Module>
  );
};