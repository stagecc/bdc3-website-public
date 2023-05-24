import React, { Fragment } from 'react'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { DataPanel, DataWrapper, CarouselListItem, CarouselBulletedList } from './subcomponents/RightPanel'
import { datasetInfoContent } from '../types'
import { useWindowWidth } from "../../../hooks";

export const DatasetInfoPanel = ({ content }) => {
  const { isCompact } = useWindowWidth();

  return (
    <Fragment>
      <DetailsPanel compact={isCompact}>
        <DetailWrapper dataset>
          <Headline compact={isCompact}>{content.headline}</Headline>
          <Description compact={isCompact}>{content.description}</Description>
        </DetailWrapper>
      </DetailsPanel>
      <DataPanel dataset compact={isCompact}>
        <DataWrapper compact={isCompact}>
          <CarouselBulletedList compact={isCompact}>
            {content.datasets.map((datum, i) => (
              <CarouselListItem key={`carousel-dataset-item-${i}`} compact={isCompact}>{datum.name}</CarouselListItem>
            ))}
          </CarouselBulletedList>
        </DataWrapper>
      </DataPanel>
    </Fragment>
  )
}

DatasetInfoPanel.propTypes = {
  content: datasetInfoContent,
}