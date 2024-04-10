import React from "react";
import PropTypes from "prop-types";

export const EducationIcon = ({ size, fill, ...rest }) => {
  return (
    <svg
      {...rest}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 245.97 157.69"
    >
      <path
        d="M41.82,151.89H32.55V117.18a10.4,10.4,0,0,0,9.27,0Z"
        fill={fill}
      />
      <path
        d="M41.82,112.54a10.43,10.43,0,1,1-9.27-18.69,10.43,10.43,0,1,1,9.27,18.69"
        fill={fill}
      />
      <path
        d="M185.6,96.24a61.46,61.46,0,0,1-122.91,0v-.57L123,125.22,185.6,94.53Z"
        fill={fill}
      />
      <path
        d="M185.6,84.1,123,114.79,62.69,85.23,41.82,75V89.21a10.4,10.4,0,0,0-9.27,0V70.45L0,54.49,123,0,246,54.49Z"
        fill={fill}
      />
    </svg>
  );
};

EducationIcon.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired
};

EducationIcon.defaultProps = {
  size: 24,
  fill: "#000"
};
