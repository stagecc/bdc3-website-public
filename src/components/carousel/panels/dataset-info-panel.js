import React from 'react'
import styled from "styled-components";
import { Overlay } from './subcomponents/Overlay'
import { DetailsPanel, DetailWrapper, Headline, Description } from './subcomponents/LeftPanel'
import { DataPanel, DataWrapper, Datum, DatumValue, DatumName } from './subcomponents/RightPanel'
import { datasetInfoContent } from '../types'


export const DatasetInfoPanel = ({ content }) => {
  return (
    <Overlay>
      <DetailsPanel>
        <DetailWrapper>
          <Headline>{content.headline}</Headline>
          <Description>{content.description}</Description>
        </DetailWrapper>
      </DetailsPanel>
      <DataPanel dataset>
        <DataWrapper>
          {content.datasets.map((datum, i) => (
            <Datum key={i} active>
              <DatumValue dataset>{datum.name}</DatumValue>
            </Datum>
          ))}
        </DataWrapper>
      </DataPanel>
    </Overlay>
  )
}

DatasetInfoPanel.propTypes = {
  content: datasetInfoContent,
}