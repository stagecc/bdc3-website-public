import React, { Fragment } from "react";
import PropTypes from 'prop-types'

export const EventMetaData = ({ title, children }) => {
  return (
    <Fragment>
      <p style={{
        margin: '0',
        fontSize: '1.1rem',
        lineHeight: '1.5',
        letterSpacing: '.7px',
        fontWeight: '300',
      }}>
        {title && <span style={{fontWeight:"600"}}>{title}: </span>}
        {children}
      </p>
    </Fragment>
  )
}


EventMetaData.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
}

