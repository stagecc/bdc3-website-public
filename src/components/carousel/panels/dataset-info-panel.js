import React from 'react'
import styled from "styled-components";
import { datasetInfoContent } from '../types'

const style = {
  margin: 0,
  flex: 1,
  padding: '1rem',
  border: '10px dashed #90f',
}

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  /* flex-direction: ${props => (props.compact ? "column" : "row")}; */
  align-items: stretch;
`;


export const DatasetInfoPanel = ({ content }) => {
  return (
    <Overlay>
      <pre style={ style }>
        { JSON.stringify(content, null, 2) }
      </pre>
    </Overlay>
  )
}

DatasetInfoPanel.propTypes = {
  content: datasetInfoContent,
}