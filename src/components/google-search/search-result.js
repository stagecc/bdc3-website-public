import React from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'

const Wrapper = styled.article`
  display: flex;
  gap: 2rem;
`

const Index = styled.span`
`

const Thumbnail = styled.div(({ url }) => `
  width: 100px;
  width: 100px;
  background-image: url(${ url });
  background-size: contain;
  background-position: 50% 0;
  background-repeat: no-repeat;
`)

const Content = styled.div`
  flex: 1;
`

const Title = styled(Subheading)`
  margin-top: 0;
`

export const Result = ({ index, title, displayLink, link, htmlSnippet, snippet, pagemap }) => {
  const imageURL = pagemap.cse_thumbnail[0].src
  
  return (
    <Wrapper>
      <Index>{ index }.</Index>
      <Thumbnail url={ imageURL } />
      <Content>
        <Title><ExternalLink to={ link }>{ title }</ExternalLink></Title>
        <em>{ displayLink }</em>
        <p dangerouslySetInnerHTML={{ __html: htmlSnippet }} />
      </Content>
    </Wrapper>
  )
}