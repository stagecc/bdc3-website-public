import React from 'react'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { useSearch } from './context'
import { ConceptCollectionButton } from './collection-button'

//

const SNIPPET_THRESHOLD = 150
const CARD_BODY_HEIGHT = 175

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
    <Card
      onClick={ () => setSelectedResult(result) }
      sx={{
        position: 'relative',
        border: '1px solid #e9e6e3',
        backgroundColor: '#f9f6f3',
        m: 0, p: 0,
        overflow: 'hidden',
        filter: 'saturate(0.5) brightness(0.975)',
        transition: 'filter 250ms',
        cursor: 'pointer',
        '&:hover': {
          filter: 'saturate(1.0) brightness(1.0)',
        },
        '.MuiCardHeader-root': {
          p: 2,
          '.MuiCardHeader-title': {
            p: 0,
          },
        },
        '.MuiCardContent-root': {
          p: 2,
          minHeight: `${ CARD_BODY_HEIGHT }px`,
          maxHeight: `${ CARD_BODY_HEIGHT }px`,
        },
        '.type': {
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#d9d6e3',
          p: 1,
          fontSize: '65%',
          borderTopLeftRadius: '3px',
        },
      }}
    >
      <CardHeader
        title={ result.name }
        subheader={ result.id }
        action={ 
          <ConceptCollectionButton
            concept={ result }
            tooltipPlacement="left"
          />
        }
      />
      
      <Divider />

      <CardContent>
        <Typography paragraph>{ snippet }</Typography>
        <span className="type">{ result.type || 'UNKNOWN' }</span>
      </CardContent>
      
    </Card>
  )
}