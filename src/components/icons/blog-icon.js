import React from "react";
import PropTypes from "prop-types";

export const BlogIcon = ({ size, fill, ...rest }) => {
  return (
    <svg
      {...rest}
      fill={fill}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 150.6 113.2"
    >
      <path d="M139.2,6.9H14.6c-2.4,0-4.4,2-4.4,4.4v90c0,2.4,2,4.4,4.4,4.4h3.1c5.4-12.6,17.6-21.3,31.8-21.3 c14.2,0,26.4,8.8,31.8,21.3h57.8c2.4,0,4.4-2,4.4-4.4v-90C143.6,8.8,141.6,6.9,139.2,6.9z M49.5,77.8c-8.3,0-15-6.7-15-15 c0-8.3,6.7-15,15-15c8.3,0,15,6.7,15,15C64.5,71,57.8,77.8,49.5,77.8z M132.4,35.7v7.8v5.2v5.7c0,3.6-3,6.6-6.6,6.6H87.5 c-4.5,3.5-8,4.7-8,4.7c0.9-2.3,1.2-3.6,1.4-4.7h-4.3c-3.6,0-6.6-3-6.6-6.6v-5.7v-5.2v-7.8V22.5c0-3.6,3-6.6,6.6-6.6h49.3 c3.6,0,6.6,3,6.6,6.6V35.7z" />
      <rect x="76.7" y="26.6" width="50.7" height="3" />
      <rect x="76.7" y="35.3" width="50.7" height="3" />
      <rect x="76.7" y="45.3" width="50.7" height="3" />
    </svg>
  );
};

BlogIcon.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired
};

BlogIcon.defaultProps = {
  size: 24,
  fill: "#000"
};
