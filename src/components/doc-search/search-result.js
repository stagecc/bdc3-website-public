import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'

const Wrapper = styled.article`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
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

const Divider = styled.div`
  position: relative;
  height: 1px;
  width: 100%;
  border-bottom: 1px solid transparent;
  opacity: 0.5;
  &:not(:last-child) {
    border-image: linear-gradient(to right, transparent 0%, var(--color-crimson) 10% 90%, transparent 100%) 1 1;
    margin: 0;
  }
`

export const Result = ({ index, title, displayLink, link, htmlSnippet, snippet, imageURL }) => {
  
  return (
    <Fragment>
      <Wrapper>
        <Index>{ index }.</Index>
        <Content>
          <Title><ExternalLink to={ link }>{ title }</ExternalLink></Title>
          <em>{ displayLink }</em>
          <p dangerouslySetInnerHTML={{ __html: htmlSnippet }} />
        </Content>
        <Thumbnail url={ imageURL } />
      </Wrapper>
      <Divider />
    </Fragment>
  )
}