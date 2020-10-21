import React from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'

const Wrapper = styled.article``

const Title = styled(Subheading)``

export const Result = props => {
  const { title, link, htmlSnippet, snippet } = props
  
  return (
    <Wrapper>
      <Title><ExternalLink to={ link }>{ title }</ExternalLink></Title>
      <p dangerouslySetInnerHTML={{ __html: htmlSnippet }} />
    </Wrapper>
  )
}