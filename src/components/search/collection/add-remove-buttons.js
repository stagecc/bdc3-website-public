import React, { useMemo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import {
  Bookmark as AddedIcon,
  BookmarkBorder as NotAddedIcon,
} from '@mui/icons-material'
import { useSearch } from '../context'

//

const RemoveTooltip = ({ children, placement }) => {
  return (
    <Tooltip
      title="Remove from collection"
      placement={ placement }
      enterDelay={ 500 }
      enterNextDelay={ 500 }
    >{ children }</Tooltip>
  )
}

const AddTooltip = ({ children, placement }) => {
  return (
    <Tooltip
      title="Add to collection"
      placement={ placement }
      enterDelay={ 500 }
      enterNextDelay={ 500 }
    >{ children }</Tooltip>
  )
}

export const ConceptCollectionButton = ({ concept, tooltipPlacement = 'bottom', size = 'medium', className }) => {
  const { collection } = useSearch()
  const inCollection = useMemo(() => collection.contains('concepts', concept.id), [collection, concept])
  
  const handleClickAddToCollection = event => {
    event.stopPropagation()
    const { id, name, description, type } = concept
    collection.add('concepts', { id, name, description, type })
  }

  const handleClickRemoveFromCollection = event => {
    event.stopPropagation()
    collection.remove('concepts', concept.id)
  }

  if (inCollection) {
    return (
      <RemoveTooltip placement={ tooltipPlacement }>
        <IconButton
          className={ className }
          variant="text" color="secondary" size={ size }
          onClick={ handleClickRemoveFromCollection }
        ><AddedIcon fontSize={ size } /></IconButton>
      </RemoveTooltip>
    )
  }

  return (
    <AddTooltip placement={ tooltipPlacement }>
      <IconButton
        className={ className }
        variant="text" color="default" size={ size }
        onClick={ handleClickAddToCollection }
      ><NotAddedIcon fontSize={ size } /></IconButton>
    </AddTooltip>
  )
}

export const StudyCollectionButton = ({ study, tooltipPlacement = 'bottom', size = 'medium', className }) => {
  const { collection } = useSearch()
  const inCollection = useMemo(() => collection.contains('studies', study.c_id), [collection, study.c_id])
  
  const handleClickAddToCollection = event => {
    event.stopPropagation()
    const { c_id, c_name, c_link, source } = study
    collection.add('studies', { id: c_id, name: c_name, url: c_link, source })
  }

  const handleClickRemoveFromCollection = event => {
    event.stopPropagation()
    const { c_id } = study
    collection.remove('studies', c_id)
  }

  if (inCollection) {
    return (
      <RemoveTooltip placement={ tooltipPlacement }>
        <IconButton
          className={ className }
          variant="text" color="secondary" size={ size }
          onClick={ handleClickRemoveFromCollection }
        ><AddedIcon fontSize={ size } /></IconButton>
      </RemoveTooltip>
    )
  }

  return (
    <AddTooltip placement={ tooltipPlacement }>
      <IconButton
        className={ className }
        variant="text" color="default" size={ size }
        onClick={ handleClickAddToCollection }
      ><NotAddedIcon fontSize={ size } /></IconButton>
    </AddTooltip>
  )
}

export const VariableCollectionButton = ({ variable, tooltipPlacement = 'bottom', size = 'medium', className }) => {
  const { collection } = useSearch()
  const inCollection = useMemo(() => collection.contains('variables', variable.id), [collection, variable.id])
  
  const handleClickAddToCollection = event => {
    event.stopPropagation()
    const { id, name, description, e_link } = variable
    collection.add('variables', { id, name, description, url: e_link })
  }

  const handleClickRemoveFromCollection = event => {
    event.stopPropagation()
    const { id } = variable
    collection.remove('variables', id)
  }

  if (inCollection) {
    return (
      <RemoveTooltip placement={ tooltipPlacement }>
        <IconButton
          className={ className }
          variant="text" color="secondary" size={ size }
          onClick={ handleClickRemoveFromCollection }
        ><AddedIcon fontSize={ size } /></IconButton>
      </RemoveTooltip>
    )
  }

  return (
    <AddTooltip placement={ tooltipPlacement }>
      <IconButton
        className={ className }
        variant="text" color="default" size={ size }
        onClick={ handleClickAddToCollection }
      ><NotAddedIcon fontSize={ size } /></IconButton>
    </AddTooltip>
  )
}