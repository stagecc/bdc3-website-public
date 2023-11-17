import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

//

export const ControlledFetcher = ({
  dataLength,
  hasMore,
  fetchMore,
  loading,
  moreMessage,
  noMoreMessage,
  loadingMessage,
  children,
}) => {
  return (
    <Fragment>
      { children }
      {
        loading
          ? loadingMessage
          : hasMore
            ? moreMessage
            : noMoreMessage
      }
    </Fragment>
  )
}

ControlledFetcher.propTypes = {
  children: PropTypes.node.isRequired,
  dataLength: PropTypes.number.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.node.isRequired,
  moreMessage: PropTypes.node.isRequired,
  noMoreMessage: PropTypes.node.isRequired,
}

//

