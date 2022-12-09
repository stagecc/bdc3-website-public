import React from 'react'
import { testimonialContent } from '../types'

const style = {
  margin: 0,
  flex: 1,
  padding: '1rem',
  border: '10px dashed #f90',
}

export const TestimonialPanel = ({ content }) => {
  return (
    <pre style={ style }>
      { JSON.stringify(content, null, 2) }
    </pre>
  )
}

TestimonialPanel.propTypes = {
  content: testimonialContent,
}
