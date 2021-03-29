import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { useDocSearch } from './search-context'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'
import { IconButton } from '../buttons'
import { DocumentRemoveIcon, DocumentAddIcon } from '../icons'
import { Visible } from 'react-grid-system'
import ReactTooltip from 'react-tooltip'

const Wrapper = styled.article(({ highlight }) => `
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem 0.5rem 0.5rem 0.75rem;
  position: relative;
  justify-content: space-between;
  transition: background-color 250ms, border-color 250ms;
  border: 1px solid ${ highlight ? `var(--color-blueberry)` : 'transparent' };
  background-color: ${ highlight ? `var(--color-sky)` : 'transparent' };
  &:hover  {
    background-color: ${ highlight ? `var(--color-sky)` : '#eee' };
  }
  &:hover .search-result__actions {
    opacity: ${ highlight ? 1 : 0.5 };
  }
`)

const Actions = styled.div.attrs({ className: 'search-result__actions' })(({ selected }) => `
  opacity: ${ selected ? 1 : 0.25 };
  position: absolute;
  bottom: -1px;
  right: -1px;
  transition: opacity 500ms;
  & p {
    margin: 0;
  }
  background-color: var(--color-blueberry);
`)

const Index = styled.span`
  min-width: 1.75rem;
  text-align: right;
  padding-top: 3px;
`

const Thumbnail = styled.div(({ url }) => `
  width: 100px;
  background-image: url(${ url });
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin: 0 4rem 0 2rem;
`)

const Content = styled.div`
  flex: 1;
`

const Title = styled(Subheading)`
  margin-top: 0;
  font-weight: normal;
`

const Divider = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  border-bottom: 1px solid var(--color-lightgrey);
  opacity: 0.5;
  &:not(:last-child) {
    margin: 0;
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
    <Actions selected={ alreadySaved }>
      <p data-tip={ alreadySaved ? 'Remove this result from my folder' : 'Add this result to my folder' }>
        {
          alreadySaved
          ? <IconButton onClick={ () => removeResult(result) }><DocumentRemoveIcon fill="var(--color-white)" size={ 24 } /></IconButton>
          : <IconButton onClick={ () => saveResult(result) }><DocumentAddIcon fill="var(--color-white)" size={ 24 } /></IconButton>
        }
      </p>
      <ReactTooltip place="left" type="dark" effect="solid"/>
  </Actions>
), [alreadySaved])

  return (
    <Fragment>
      <Divider />
      <Wrapper highlight={ alreadySaved }>
        <Index>{ index }.</Index>
        <Content>
          <Title><ExternalLink to={ link }>{ title }</ExternalLink></Title>
          <em>{ displayLink }</em>
          <p dangerouslySetInnerHTML={{ __html: htmlSnippet.replace(/<br>/g, '').replace(/n?\\n/gm, '') }} />
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