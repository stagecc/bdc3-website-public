import PropTypes from 'prop-types'

export const testimonialContent = PropTypes.shape({
  quote: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
}).isRequired

// Boundaries for Testimonial Content
// Quote:
  // Max: 150 characters *
  // Min: 50 characters
// Attribution:
  // Max: 150 characters *
  // Min: none
// * subject to visual confirmation because letters are not all equally sized

export const statsContent = PropTypes.shape({
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
  ).isRequired,
}).isRequired

// Boundaries for Stats Content
// Headline:
  // Max: 75 characters *
  // Min: none
// Description:
  // Max: 130 characters *
  // Min: none
// Stats:
  // array of objects
  // total items: no more than 2 before needing to change the style
  // name: 35 characters *
  // value: 10 numbers without punctuation, 8-9 numbers with punctuation *
// * subject to visual confirmation because letters are not all equally sized


export const datasetInfoContent = PropTypes.shape({
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}).isRequired

// Boundaries for DatasetInfo Content
// Headline:
  // Max: 75 characters *
  // Min: none
// Description:
  // Max: 130 characters *
  // Min: none
// datasets:
  // array of objects
  // total items: at least 2, no more than 4
  // name: 70 characters (depends on length of other lines as well) *
// * subject to visual confirmation because letters are not all equally sized


export const panelType = PropTypes.shape({
  type: PropTypes.oneOf([
    'testimonial', 'stats', 'dataset-info'
  ]).isRequired,
  content: PropTypes.oneOfType([
    testimonialContent, statsContent, datasetInfoContent
  ]).isRequired,
}).isRequired
