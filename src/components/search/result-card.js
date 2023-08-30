import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { useSearch } from './context'
import { ConceptCollectionButton } from './collection'
import { snipText } from '../../utils'

//

const SNIPPET_THRESHOLD = 150
const CARD_BODY_HEIGHT = 120

export const ResultCard = ({ index, result }) => {
  const { collection, setSelectedResult } = useSearch()

  const inCollection = useMemo(() => collection.contains('concepts', result.id), [collection, result.id])

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
        '.collection-button': {
          transition: 'filter 250ms',
          filter: inCollection ? 'opacity(0.9)' : 'opacity(0.1)',
        },
        '&:hover .collection-button': {
          filter: 'opacity(1.0)',
        },
      }}
    >
      <CardHeader
        title={ result.name }
        subheader={ result.id }
        action={ 
          <ConceptCollectionButton
            className="collection-button"
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
