import React, { Fragment } from "react";
import {
  Paragraph,
  Subheading,
} from "../typography";
import { Link } from "../link";
import { Grid, Stack, Typography, Box, Divider } from '@mui/material'
import BDCLogo from '../../images/favicon.png'
import styled from 'styled-components'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Avatar from '@mui/material/Avatar';

const EventMeta = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  line-height: 1;
  margin-top: 0;
`

export const EventListPreview = ({event}) => {
  const { excerpt } = event.node;
  const {
    title,
    path,
    date,
    display_date,
    time,
    location,
    url,
    bdcHosted
  } = event.node.frontmatter

  return (
    <Fragment>
      <Stack direction="row" gap={4}>
        <Box sx={{minWidth: '60px', marginTop: '0.25rem' }}>
          {bdcHosted && (
            <Avatar
              src={BDCLogo}
              sx={{
                width: 28, height: 28,
                border: '1px solid #c5cfe8'
              }}
            />
          )}
        </Box>
        <Box>
        <Subheading left>
            <Link 
              to={path}
            >{title}</Link>
          </Subheading>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            gap={{ xs: 1, sm: 2, md: 4 }}
            flex
          >
            <Grid container spacing={2}>
              <Grid item>
                <CalendarTodayIcon color="var(--color-blueberry)" sx={{fontSize:"1.2rem", margin: 0}}/> 
              </Grid>
              <Grid item>
                <EventMeta> {display_date}</EventMeta>
                <EventMeta>{time}</EventMeta>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <LocationOnOutlinedIcon color="var(--color-blueberry)" sx={{fontSize:"1.2rem", margin: 0}}/> 
              </Grid>
              <Grid item>
                <Box>
                  {
                    url ? (
                      <EventMeta>
                        {location}: <Link to={url}>Register Here</Link>
                      </EventMeta>
                    ) : (
                      <EventMeta>
                        {location}
                      </EventMeta>
                    )
                  }
                </Box>
              </Grid>
            </Grid>
            
          </Stack>
          <Paragraph style={{fontSize: '85%'}}>{excerpt} <Link to={path}>
            Read More
            </Link>
          </Paragraph> 
        </Box>

      </Stack>
      <Divider sx={{margin: '1rem 0 2rem'}}/>
    </Fragment>
  )
}


