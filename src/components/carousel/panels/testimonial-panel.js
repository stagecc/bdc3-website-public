import React, { Fragment } from 'react'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { testimonialContent } from '../types'
import { useWindowWidth } from "../../../hooks";


export const TestimonialPanel = ({ content }) => {
  const { isCompact } = useWindowWidth();

  return (
    <Fragment>
      <DetailsPanel compact={isCompact}>
        <DetailWrapper>
          <Headline compact={isCompact}>{content.quote}</Headline>
          <Description compact={isCompact}>{content.attribution}</Description>
        </DetailWrapper>
      </DetailsPanel>
    </Fragment>
  )
}

TestimonialPanel.propTypes = {
  content: testimonialContent,
}
