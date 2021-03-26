import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { useDocSearch } from './search-context'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'
import { IconButton } from '../buttons'
import { DocumentRemoveIcon, DocumentAddIcon } from '../icons'
import { Visible } from 'react-grid-system'
import ReactTooltip from 'react-tooltip'

const Wrapper = styled.article`
  display: flex;
  gap: 2rem;
  margin: 2rem 1rem;
  position: relative;
  justify-content: space-between;
  & .search-result__actions {
  }
  &:hover .search-result__actions {
  }
`

const Index = styled.span`
  min-width: 3rem;
  text-align: right;
`

const Thumbnail = styled.div(({ url }) => `
  width: 100px;
  background-image: url(${ url });
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin-right: 2rem;
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
  border-bottom: 1px solid var(--color-lightgrey);
  opacity: 0.5;
  &:not(:last-child) {
    margin: 0;
  }
`

const Actions = styled.div.attrs({ className: 'search-result__actions' })`
  position: absolute;
  top: 2.25rem;
  left: 20px;
  display: flex;
  padding: 0;
  & p {
    margin: 0;
  }
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

  const MemoizedSaveButton = useMemo(() => (
    <Actions>
      <p data-tip={ alreadySaved ? 'Remove this result from my folder' : 'Add this result to my folder' }>
        {
          alreadySaved
          ? <IconButton onClick={ () => removeResult(result) }><DocumentRemoveIcon fill="var(--color-crimson)" size={ 36 } /></IconButton>
          : <IconButton onClick={ () => saveResult(result) }><DocumentAddIcon fill="var(--color-lightgrey)" size={ 36 } /></IconButton>
        }
      </p>
      <ReactTooltip place="left" type="dark" effect="solid"/>
  </Actions>
), [alreadySaved])

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
          <Thumbnail url={ thumbnailURL } />
        </Visible>
        { MemoizedSaveButton }
      </Wrapper>
      <Divider />
    </Fragment>
  )
}