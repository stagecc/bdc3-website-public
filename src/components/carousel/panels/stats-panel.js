import React, { Fragment } from 'react'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { DataPanel, DataWrapper, Datum, DatumValue, DatumName } from './subcomponents/RightPanel'
import { statsContent } from '../types'
import { useWindowWidth } from "../../../hooks";

export const StatsPanel = ({ content }) => {
  const { isCompact } = useWindowWidth();

  return (
    <Fragment>
      <DetailsPanel compact={isCompact}>
        <DetailWrapper>
          <Headline compact={isCompact}>{content.headline}</Headline>
          <Description compact={isCompact}>{content.description}</Description>
        </DetailWrapper>
      </DetailsPanel>
      <DataPanel compact={isCompact}>
        <DataWrapper>
          {content.stats.map((datum, i) => (
            <Datum key={`carousel-stats-item-${i}`} active compact={isCompact}>
              <DatumValue compact={isCompact}>{datum.value}</DatumValue>
              <DatumName>{datum.name}</DatumName>
            </Datum>
          ))}
        </DataWrapper>
      </DataPanel>
    </Fragment>
  )
}

StatsPanel.propTypes = {
  content: statsContent,
}
