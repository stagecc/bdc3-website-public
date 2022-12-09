import React from 'react'
import { datasetInfoContent } from '../types'

const style = {
  margin: 0,
  flex: 1,
  padding: '1rem',
  border: '10px dashed #90f',
}

export const DatasetInfoPanel = ({ content }) => {
  return (
    <pre style={ style }>
      { JSON.stringify(content, null, 2) }
    </pre>
  )
}

DatasetInfoPanel.propTypes = {
  content: datasetInfoContent,
}
