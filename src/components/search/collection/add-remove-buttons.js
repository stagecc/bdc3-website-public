import React, { useMemo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import {
  Bookmark as AddedIcon,
  BookmarkBorder as NotAddedIcon,
} from '@mui/icons-material'
import { useSearch } from '../context'

//

export const ConceptCollectionButton = ({ concept, tooltipPlacement = 'bottom', size = 'medium', className }) => {
  const { cart } = useSearch()
  const inCollection = useMemo(() => cart.contains('concepts', concept.id), [cart, concept])
  
  const handleClickAddToCart = event => {
    event.stopPropagation()
    const { id, name, description, type } = concept
    cart.add('concepts', { id, name, description, type })
  }

  const handleClickRemoveFromCart = event => {
    event.stopPropagation()
    cart.remove('concepts', concept.id)
  }

  if (inCollection) {
    return (
      <Tooltip title="Remove from Collection" placement={ tooltipPlacement }>
        <IconButton
          className={ className }
          variant="text" color="secondary" size={ size }
          onClick={ handleClickRemoveFromCart }
        ><AddedIcon fontSize={ size } /></IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title="Add to Collection" placement={ tooltipPlacement }>
      <IconButton
        className={ className }
        variant="text" color="default" size={ size }
        onClick={ handleClickAddToCart }
      ><NotAddedIcon fontSize={ size } /></IconButton>
    </Tooltip>
  )
}

export const StudyCollectionButton = ({ study, tooltipPlacement = 'bottom', size = 'medium', className }) => {
  const { cart } = useSearch()
  const inCollection = useMemo(() => cart.contains('studies', study.c_id), [cart, study.c_id])
  
  const handleClickAddToCart = event => {
    event.stopPropagation()
    const { c_id, c_name, c_link, source } = study
    cart.add('studies', { id: c_id, name: c_name, url: c_link, source })
  }

  const handleClickRemoveFromCart = event => {
    event.stopPropagation()
    const { c_id } = study
    cart.remove('studies', c_id)
  }

  if (inCollection) {
    return (
      <Tooltip title="Remove from Collection" placement={ tooltipPlacement }>
        <IconButton
          className={ className }
          variant="text" color="secondary" size={ size }
          onClick={ handleClickRemoveFromCart }
        ><AddedIcon fontSize={ size } /></IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title="Add to Collection" placement={ tooltipPlacement }>
      <IconButton
        className={ className }
        variant="text" color="default" size={ size }
        onClick={ handleClickAddToCart }
      ><NotAddedIcon fontSize={ size } /></IconButton>
    </Tooltip>
  )
}

export const VariableCollectionButton = ({ variable, tooltipPlacement = 'bottom', size = 'medium', className }) => {
  const { cart } = useSearch()
  const inCollection = useMemo(() => cart.contains('variables', variable.id), [cart, variable.id])
  
  const handleClickAddToCart = event => {
    event.stopPropagation()
    const { id, name, description, e_link } = variable
    cart.add('variables', { id, name, description, url: e_link })
  }

  const handleClickRemoveFromCart = event => {
    event.stopPropagation()
    const { id } = variable
    cart.remove('variables', id)
  }

  if (inCollection) {
    return (
      <Tooltip title="Remove from Collection" placement={ tooltipPlacement }>
        <IconButton
          className={ className }
          variant="text" color="secondary" size={ size }
          onClick={ handleClickRemoveFromCart }
        ><AddedIcon fontSize={ size } /></IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title="Add to Collection" placement={ tooltipPlacement }>
      <IconButton
        className={ className }
        variant="text" color="default" size={ size }
        onClick={ handleClickAddToCart }
      ><NotAddedIcon fontSize={ size } /></IconButton>
    </Tooltip>
  )
}