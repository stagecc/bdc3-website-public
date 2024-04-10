import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ExternalLink } from './external-link'

export const Link = ({ to, children, ...props }) => {
  const externalUrlPattern = new RegExp(/^https?:\/\//)
  const match = externalUrlPattern.exec(to)
  if (match) {
    return <ExternalLink to={ to } { ...props }>{ children }</ExternalLink>
  }
  return <GatsbyLink to={ to } { ...props }>{ children }</GatsbyLink>
}
