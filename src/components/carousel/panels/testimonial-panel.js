import React, { Fragment } from 'react'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { testimonialContent } from '../types'


export const TestimonialPanel = ({ content }) => {
  return (
    <Fragment>
      <DetailsPanel>
        <DetailWrapper>
          <Headline>{content.quote}</Headline>
          <Description>{content.attribution}</Description>
        </DetailWrapper>
      </DetailsPanel>
    </Fragment>
  )
}

TestimonialPanel.propTypes = {
  content: testimonialContent,
}
