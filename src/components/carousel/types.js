import PropTypes from 'prop-types'

export const testimonialContent = PropTypes.shape({
  quote: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
}).isRequired

export const statsContent = PropTypes.shape({
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}).isRequired

export const datasetInfoContent = PropTypes.shape({
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}).isRequired

export const panelType = PropTypes.shape({
  type: PropTypes.oneOf([
    'testimonial', 'stats', 'dataset-info'
  ]).isRequired,
  content: PropTypes.oneOfType([
    testimonialContent, statsContent, datasetInfoContent
  ]).isRequired,
}).isRequired
