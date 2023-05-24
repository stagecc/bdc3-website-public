import React, { Fragment } from 'react'
import { DetailsPanel, TestimonialWrapper, Quote, Attribution } from './subcomponents/LeftPanel'
import { testimonialContent } from '../types'
import { useWindowWidth } from "../../../hooks";


export const TestimonialPanel = ({ content }) => {
  const { isCompact } = useWindowWidth();

  return (
    <Fragment>
      <DetailsPanel compact={isCompact}>
        <TestimonialWrapper compact={isCompact}>
          <Quote compact={isCompact}>{content.quote}</Quote>
          <Attribution compact={isCompact}>{content.attribution}</Attribution>
        </TestimonialWrapper>
      </DetailsPanel>
    </Fragment>
  )
}

TestimonialPanel.propTypes = {
  content: testimonialContent,
}
