import React, {Fragment} from "react";
// import { AnimateOnMount } from "../../components/anim";
import { graphql } from "gatsby";
import { Link } from "../link";
import { SEO } from "../seo";
import { Title, Paragraph, Meta, Subsubheading, Subheading } from "../typography";
import { ButtonLink } from "../buttons";
// import { Container as Grid, Row, Col } from "react-grid-system";
import { Module, PageContent } from "../layout";
import BDCLogo from '../../images/favicon.png'
import { Avatar, Divider, Box, Grid, useMediaQuery, Stack } from '@mui/material/';
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

            <Subheading left noMargin style={{margin: 0, }} >
              <Link to={path}>{title}</Link>
            </Subheading>
            
            {
              !externalEvent &&(
                <Stack direction="row" spacing={3} sx={{}}>
                  <Avatar src={BDCLogo} sx={{
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
        <Grid container columns={16} key={title} spacing={3} sx={{marginTop: '1rem'}}>
        <Grid sm={1}>
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
        <Grid  sm={4}>
          <Subsubheading style={{margin: 0, fontWeight: 500, color: 'var(--color-grey)'}}>{display_date ? display_date : date}</Subsubheading>
        </Grid>
        <Grid sm={9}>
          <Subsubheading left noMargin style={{margin: 0}}>
            <Link to={path}>{title}</Link>
          </Subsubheading>
        </Grid>
        <Grid sm={2}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {
              forum_post && (
                <Link to={forum_post} noIcon>
                  <SourceOutlinedIcon sx={{fontSize: '1.2rem'}}/>
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
              <Subheading left noMargin>Events</Subheading>
            </Grid>
          </Grid>
        :
        <Grid container columns={16} spacing={3}>
        <Grid sm={1}></Grid>
        <Grid sm={4}>
          <Subheading left noMargin>Date</Subheading>
        </Grid>
        <Grid sm={9}>
          <Subheading left noMargin>Event Page</Subheading>
        </Grid>
        <Grid sm={2}>
          <Subheading center noMargin>Materials</Subheading>
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