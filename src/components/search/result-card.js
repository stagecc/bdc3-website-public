import React from 'react'
import { Box, Typography } from '@mui/material'
import { useSearch } from './context'
import { Subheading } from '../typography'

const SNIPPET_THRESHOLD = 150
const CARD_HEIGHT = 220

/*
 * Returns an initial snippet of given text.
 * 
 * @param {String} sentence The text to snip.
 * @param {Number} threshold The bounding character length.
 * @return {String} The first `threshold` characters of `sentence`,
 *         with the final word completed, followed by an ellipsis.
 */
function snipText(sentence, threshold) {
  if (sentence.length <= threshold) {
    return sentence
  }
  return sentence.split(' ')
    .reduce((acc, word) => {
      if (acc.join(' ').length > threshold) {
        return acc
      }
      return acc.concat(word)
    }, []).join(' ') + '...'
}

export const ResultCard = ({ index, result }) => {
  const { setSelectedResult } = useSearch()

  const snippet = snipText(result.description, SNIPPET_THRESHOLD)

  return (
    <Box
      onClick={ () => setSelectedResult(result) }
      sx={{
        position: 'relative',
        border: '1px solid #e9e6e3',
        backgroundColor: '#f9f6f3',
        m: 0, p: 2,
        minHeight: `${ CARD_HEIGHT }px`,
        maxHeight: `${ CARD_HEIGHT }px`,
        overflow: 'hidden',
        filter: 'saturate(0.5) brightness(0.975)',
        transition: 'filter 250ms',
        cursor: 'pointer',
        '&:hover': {
          filter: 'saturate(1.0) brightness(1.0)',
        },
        '.MuiTypography-paragraph': { my: 1 },
        '.type': {
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#ccc',
          p: 1,
          fontSize: '65%',
        },
      }}
    >
      <Subheading noMargin>{ result.name }</Subheading>
      <Typography paragraph>{ snippet }</Typography>
      <span className="type">{ result.type }</span>
    </Box>
  )
}
