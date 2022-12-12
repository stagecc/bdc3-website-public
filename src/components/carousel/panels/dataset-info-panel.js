import React from 'react'
import styled from "styled-components";
import { Overlay } from './subcomponents/Overlay'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { DataPanel, DataWrapper, CarouselListItem, CarouselBulletedList } from './subcomponents/RightPanel'
import { datasetInfoContent } from '../types'

export const DatasetInfoPanel = ({ content }) => {
  return (
    <Overlay>
      <DetailsPanel>
        <DetailWrapper dataset>
          <Headline>{content.headline}</Headline>
          <Description>{content.description}</Description>
        </DetailWrapper>
      </DetailsPanel>
      <DataPanel dataset>
        <DataWrapper>
          <CarouselBulletedList>
            {content.datasets.map((datum, i) => (
              <CarouselListItem key={i}>{datum.name}</CarouselListItem>
            ))}
          </CarouselBulletedList>
        </DataWrapper>
      </DataPanel>
    </Overlay>
  )
}

DatasetInfoPanel.propTypes = {
  content: datasetInfoContent,
}