import React from 'react'
import styled from "styled-components";
import { Overlay } from './subcomponents/Overlay'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { DataPanel, DataWrapper, Datum, DatumValue, DatumName } from './subcomponents/RightPanel'
import { statsContent } from '../types'

export const StatsPanel = ({ content }) => {
  return (
    <Overlay>
      <DetailsPanel>
        <DetailWrapper>
          <Headline>{content.headline}</Headline>
          <Description>{content.description}</Description>
        </DetailWrapper>
      </DetailsPanel>
      <DataPanel>
        <DataWrapper>
          {content.stats.map((datum, i) => (
            <Datum key={i} active>
              <DatumValue>{datum.value}</DatumValue>
              <DatumName>{datum.name}</DatumName>
            </Datum>
          ))}
        </DataWrapper>
      </DataPanel>
    </Overlay>
  )
}

StatsPanel.propTypes = {
  content: statsContent,
}
