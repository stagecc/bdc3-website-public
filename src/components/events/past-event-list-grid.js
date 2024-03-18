import React from "react";
// import { AnimateOnMount } from "../../components/anim";
import { graphql } from "gatsby";
import { Link } from "../link";
import { SEO } from "../seo";
import { Title, Paragraph, Meta, Subsubheading, Subheading } from "../typography";
import { ButtonLink } from "../buttons";
// import { Container as Grid, Row, Col } from "react-grid-system";
import { Module, PageContent } from "../layout";
import BDCLogo from '../../images/favicon.png'
import { Avatar, Divider, Box, Grid } from '@mui/material/';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

export const columns = {
  "xs": {
    "col1": 3,
    "col2": 9,
    "col3": 9,
    "col4": 3
  },
  "sm": {
    "col1": 1,
    "col2": 4,
    "col3": 9,
    "col4": 2
  }
}

const PastEventListItem = ({event}) => {
  const {
    title,
    path,
    date,
    display_date,
    time,
    location,
    url,
    bdcHosted,
    forum_post
  } = event.node.frontmatter;

  return (
    <Grid container columns={16} key={title} spacing={2} sx={{marginTop: '1rem'}}>
      <Grid xs={columns.xs.col1} sm={columns.sm.col1}>
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '3px' }} >
          {bdcHosted && (
            <Avatar
              src={BDCLogo}
              sx={{
                width: 18, height: 18,
                border: '1px solid #c5cfe8'
              }}
            />
          )}
        </Box>
      </Grid>
      <Grid xs={columns.xs.col2} sm={columns.sm.col2}>
        <Subsubheading style={{margin: 0, fontWeight: 500}}>{display_date ? display_date : date}</Subsubheading>
      </Grid>
      <Grid xs={columns.xs.col3} sm={columns.sm.col3}>
        <Subsubheading noMargin style={{margin: 0}}>
          <Link to={path}>{title}</Link>
        </Subsubheading>
      </Grid>
      <Grid xs={columns.xs.col4} sm={columns.sm.col4}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Link to={forum_post} noIcon>
            <SourceOutlinedIcon sx={{fontSize: '1.2rem'}}/>
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export const EventsList = ({ title, events }) => {
  return (
    <Module title={title} style={{marginTop: '2.5rem'}}>
      <Grid container columns={16} spacing={2}>
        <Grid sm={columns.sm.col1}></Grid>
        <Grid sm={columns.sm.col2}>
          <Subheading left noMargin>Date</Subheading>
        </Grid>
        <Grid sm={columns.sm.col3}>
          <Subheading left noMargin>Event Page</Subheading>
        </Grid>
        <Grid sm={columns.sm.col4}>
          <Subheading center noMargin>Materials</Subheading>
        </Grid>
      </Grid>
      <Divider sx={{margin: '0 0 1rem'}}/>

      {events.length ? (
        events.map((event) => (<PastEventListItem event={event}/>))
      ) : (
        <Paragraph center>
          There are no events to display at the moment. Please check back
          soon!
        </Paragraph>
      )}
    </Module>
  );
};