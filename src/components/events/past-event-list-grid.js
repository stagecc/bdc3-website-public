import React from "react";
// import { AnimateOnMount } from "../../components/anim";
import { graphql } from "gatsby";
import { Link } from "../link";
import { SEO } from "../seo";
import { Title, Paragraph, Meta, Subsubheading } from "../typography";
import { ButtonLink } from "../buttons";
import { Container as Grid, Row, Col } from "react-grid-system";
import { Module, PageContent } from "../layout";
import BDCLogo from '../../images/favicon.png'
import { Avatar, Divider, Box } from '@mui/material/';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';

const PastEventListItem = ({event}) => {
  const {
    title,
    path,
    date,
    display_date,
    time,
    location,
    url,
    bdcHosted
  } = event.node.frontmatter;

  return (
    <Row key={title} style={{margin: '1rem 0'}}>
      <Col xs={3} sm={1}>
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
      </Col>
      <Col xs={9} sm={2}>
        <Meta style={{margin: 0, fontWeight: 500}}>{display_date ? display_date : date}</Meta>
      </Col>
      <Col xs={9} sm={6}>
        <Subsubheading style={{margin: 0}}>
          <Link to={path}>{title}</Link>
        </Subsubheading>
      </Col>
      <Col xs={3} sm={3}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <SourceOutlinedIcon sx={{fontSize: '1rem'}}/>
        </Box>
      </Col>
    </Row>
  )
}

export const EventsList = ({ title, events }) => {
  return (
    <Module title={title}>
      <Grid fluid>
        <Row>
          <Col sm={1}></Col>
          <Col sm={2}>
          <Paragraph left noMargin>
              DATE
            </Paragraph>
          </Col>
          <Col sm={6}>
          <Paragraph left noMargin>
              LINK TO EVENT PAGE
            </Paragraph>
          </Col>
          <Col sm={3}>
            <Paragraph center noMargin>
              LINK TO MATERIALS
            </Paragraph>
          </Col>
        </Row>
        <Divider sx={{margin: '0.5rem 0 1rem'}}/>
        {events.length ? (
          events.map((event) => (<PastEventListItem event={event}/>))
        ) : (
          <Paragraph center>
            There are no events to display at the moment. Please check back
            soon!
          </Paragraph>
        )}
      </Grid>
    </Module>
  );
};