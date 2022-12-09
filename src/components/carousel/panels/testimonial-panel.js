import React from 'react'
import styled from "styled-components";
import { Overlay } from './subcomponents/Overlay'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { testimonialContent } from '../types'


export const TestimonialPanel = ({ content }) => {
  return (
    <Overlay>
      <DetailsPanel>
        <DetailWrapper>
          <Headline>{content.quote}</Headline>
          <Description>{content.attribution}</Description>
        </DetailWrapper>
      </DetailsPanel>
    </Overlay>
  )
}

TestimonialPanel.propTypes = {
  content: testimonialContent,
}
