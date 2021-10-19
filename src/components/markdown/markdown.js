import React, { useMemo } from 'react'
import { Link } from '../link'
import ReactMarkdown from 'react-markdown'

export const Markdown = ({ src }) => {
  console.log(src)
  const componentMap = useMemo(() => ({
    a: function Anchor({ node, href, children, ...props }) {
      console.log(node)
      return <Link to={ href } { ...props }>{ children }</Link>
    },
  }), [])

  return (
    <ReactMarkdown components={ componentMap } children={ src } />
  )
}
