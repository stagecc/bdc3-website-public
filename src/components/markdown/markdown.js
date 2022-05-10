import React, { useMemo } from 'react'
import { Link } from '../link'
import ReactMarkdown from 'react-markdown'

export const Markdown = ({ src }) => {
  const componentMap = useMemo(() => ({
    a: function Anchor({ node, href, children, ...props }) { return <Link to={ href } { ...props }>{ children }</Link> },
    p: function Anchor({ node, href, children, ...props }) { return <p style={{lineHeight: '1.5', letterSpacing: '0.2px' }}>{children}</p> },
    li: function Anchor({ node, href, children, ...props }) { return <li style={{lineHeight: '1.5', letterSpacing: '0.2px' }}>{children}</li> }
  }), [])

  return (
    <ReactMarkdown components={ componentMap } children={ src } />
  )
}
