import React from 'react'
import { statsContent } from '../types'

const style = {
  margin: 0,
  flex: 1,
  padding: '1rem',
  border: '10px dashed #0f9',
}

export const StatsPanel = ({ content }) => {
  return (
    <pre style={ style }>
      { JSON.stringify(content, null, 2) }
    </pre>
  )
}

StatsPanel.propTypes = {
  content: statsContent,
}
