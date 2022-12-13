import React from 'react'
import { DatasetInfoPanel } from './dataset-info-panel'
import { TestimonialPanel } from './testimonial-panel'
import { StatsPanel } from './stats-panel'
import { panelType } from '../types'

const panels = {
  'dataset-info': DatasetInfoPanel,
  testimonial: TestimonialPanel,
  stats: StatsPanel,
}

export const CarouselPanel = ({ item }) => {
  const { type, content } = item

  return React.createElement(panels[type], { content })
}

CarouselPanel.propTypes = {
  item: panelType,
}
