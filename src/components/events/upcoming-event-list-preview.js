import React, { Fragment } from "react";
import {
  Paragraph,
  Subheading,
  Meta
} from "../typography";
import { Link } from "../link";
import { Grid, Divider, useMediaQuery } from '@mui/material'
import BDCLogo from '../../images/favicon.png'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const EventMeta = styled(Paragraph)`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1;
  margin-top: 0;
`

const IconTitleSection = ({externalEvent, title, path}) => {
  return (
    <Fragment>
      {
        externalEvent ? (
          <Fragment>
            {/* Empty grid placeholder section */}
            <Grid item xs={0} sm={0} md={1}></Grid>
            <Grid item xs={16} sm={16} md={15}>
              <Link to={path}>
                <Subheading left noMargin>{title}</Subheading>
              </Link>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={2} sm={1} md={1} sx={{display: 'flex'}}>
              <Avatar src={BDCLogo} sx={{
                width: 24, height: 24,
                border: '1px solid #c5cfe8',
                margin: '4px auto'
              }}/>
            </Grid>
            <Grid item xs={14} sm={15} md={15}>
              <Link to={path}>
                <Subheading left noMargin>{title}</Subheading>
              </Link>
            </Grid>
          </Fragment>
        )
      }
    </Fragment>
  )
}

const MobileIconTitleSection = ({externalEvent, title, path}) => {
  return (
    <Fragment>
      {
        externalEvent ? (
          <Grid item xs={16} sm={16}>
            <Link to={path}>
              <Subheading left noMargin>{title}</Subheading>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={16} sm={16} sx={{marginLeft: '1px'}}>
            <Link to={path}>
              <Subheading left noMargin>{title}</Subheading>
            </Link>
            <Grid container columns={24} sx={{}}>
              <Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
                <Avatar src={BDCLogo} sx={{
                  width: 20, height: 20,
                  border: '1px solid #c5cfe8',
                }}/>
              </Grid>
              <Grid item xs={22} sm={11}>
                <Meta noMargin>{" "}hosted by BDC</Meta>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    </Fragment>
  )
}

const SpacerSection = styled(Grid)`
`
const DateTimeLocationSection = ({display_date, time, location, url, xs, sm, md}) => {

  return (
    <Grid item xs={xs} sm={sm} md={md} sx={{marginTop: '0.5rem'}}>

      {/*Date/time and location section */}
      <Grid container columns={24}>
        <Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
          <CalendarTodayIcon sx={{fontSize:"0.9rem", margin: 0, color: '#21568a'}}/> 
        </Grid>
        <Grid item xs={22} sm={11}>
          <EventMeta> {display_date}</EventMeta>
          <EventMeta>{time}</EventMeta>
        </Grid>
        <Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
          <LocationOnOutlinedIcon  sx={{fontSize:"0.9rem", margin: 0, color: '#21568a'}}/> 
        </Grid>
        <Grid item xs={22} sm={11}>
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
        </Grid>
      </Grid>
    </Grid>
  )
}
const MobileDateTimeLocationSection = ({display_date, time, location, url, xs, sm, md}) => {

  return (
    <Grid item xs={xs} sm={sm} md={md} sx={{marginTop: '0.5rem'}}>

      {/*Date/time and location section */}
      <Grid container columns={24}>
        <Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
          <CalendarTodayIcon sx={{fontSize:"0.9rem", margin: 0, color: '#21568a'}}/> 
        </Grid>
        <Grid item xs={22} sm={11}>
          <EventMeta> {display_date} | {time}</EventMeta>
        </Grid>
        <Grid item xs={2} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
          <LocationOnOutlinedIcon  sx={{fontSize:"0.9rem", margin: 0, color: '#21568a'}}/> 
        </Grid>
        <Grid item xs={22} sm={11}>
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
        </Grid>
      </Grid>
    </Grid>
  )
}

const DescriptionSection = ({excerpt, path, xs, sm, md}) => {

  return (
    <Grid item xs={xs} sm={sm} md={md}>
      {/*Event excerpt section and link to read more */}
      <Paragraph style={{fontSize: '85%'}}>{excerpt} <Link to={path}>
        Read More</Link>
      </Paragraph>
    </Grid>
  )
}

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
    externalEvent
  } = event.node.frontmatter

  const theme = useTheme();

  return (
    <Fragment>
      <Grid container columns={16}>
        {
         useMediaQuery(theme.breakpoints.down("md")) ? 
          <MobileIconTitleSection externalEvent={externalEvent} title={title} path={path}/>
         : 
          <IconTitleSection externalEvent={externalEvent} title={title} path={path}/> 
        }

        <SpacerSection item xs={0} sm={0} md={1}/>
        {
          useMediaQuery(theme.breakpoints.down("sm")) ? 
            <MobileDateTimeLocationSection item 
              display_date={display_date}
              time={time}
              location={location}
              url={url}
            />
          :
            <DateTimeLocationSection item xs={16} sm={16} md={15}
              display_date={display_date}
              time={time}
              location={location}
              url={url}
            />
        }

        <SpacerSection item xs={0} sm={0} md={1}/>
        <DescriptionSection item xs={16} sm={16} md={15} 
          excerpt={excerpt}
          path={path}
        />

      </Grid>

      <Divider sx={{margin: '1rem 0 2rem'}}/>
    </Fragment>
  )
}


