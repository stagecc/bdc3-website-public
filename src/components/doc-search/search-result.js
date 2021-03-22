import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { useDocSearch } from './search-context'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'
import { IconButton } from '../buttons'
import { DeleteIcon, StarIcon } from '../icons'
import { Visible } from 'react-grid-system'

const Wrapper = styled.article`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  position: relative;
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

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  & svg {
    fill: var(--color-crimson);
  }
`

export const Result = ({ index, result }) => {
  const { savedResults, saveResult, removeResult } = useDocSearch()
  const { title, displayLink, link, htmlSnippet, snippet, imageURL } = result
  
  let thumbnailURL = ''
  if (result?.pagemap?.cse_thumbnail) {
    thumbnailURL = result.pagemap.cse_thumbnail[0].src
  }

  const alreadySaved = useMemo(() => savedResults.find(savedResult => savedResult.cacheId === result.cacheId) ? true : false, [result, savedResults, savedResults.length])

  return (
    <Fragment>
      <Wrapper>
        <Index>{ index }.</Index>
        <Content>
          <Title><ExternalLink to={ link }>{ title }</ExternalLink></Title>
          <em>{ displayLink }</em>
          <p dangerouslySetInnerHTML={{ __html: htmlSnippet.replace('<br>', '') }} />
        </Content>
        <Visible lg xl>
          <Thumbnail url={ imageURL } />
        </Visible>
        <Actions>
          {
            alreadySaved
              ? <IconButton onClick={ () => removeResult(result) }><StarIcon fill="var(--color-crimson)" size={ 24 } /></IconButton>
              : <IconButton onClick={ () => saveResult(result) }><StarIcon fill="var(--color-lightgrey)" size={ 24 } /></IconButton>
          }
        </Actions>
      </Wrapper>
      <Divider />
    </Fragment>
  )
}