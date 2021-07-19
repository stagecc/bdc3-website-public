import React from "react";
import PropTypes from "prop-types";

export const DocumentsIcon = ({ size, fill, ...rest }) => {
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
      viewBox="0 0 174.9 129.3"
    >
      <path d="M139.2,21.3h-0.5c0,0.2,0.1,0.4,0.1,0.6v94.9c0,2.8-2.3,5.1-5.1,5.1H62.8c0.3,2.5,2.4,4.5,5,4.5h71.4c2.8,0,5.1-2.3,5.1-5.1 V26.4C144.3,23.6,142,21.3,139.2,21.3z" />
      <path d="M134.4,17c-0.3-2.5-2.4-4.5-5-4.5h-0.5c0,0.2,0.1,0.4,0.1,0.6V17V108c0,2.8-2.3,5.1-5.1,5.1H58.4h-5.5 c0.3,2.5,2.4,4.5,5,4.5h0.5h70.8c2.8,0,5.1-2.3,5.1-5.1V17.6C134.4,17.4,134.4,17.2,134.4,17z" />
      <path d="M124.5,8.2c-0.3-2.5-2.4-4.5-5-4.5H48.1c-2.8,0-5.1,2.3-5.1,5.1v94.9c0,2.8,2.3,5.1,5.1,5.1h0.5h5.5h65.3 c2.8,0,5.1-2.3,5.1-5.1V12.7V8.8C124.5,8.6,124.5,8.4,124.5,8.2z M117.7,81.4H49.9v-5h67.8V81.4z M117.7,67H49.9v-5h67.8V67z M117.7,52.6H49.9v-5h67.8V52.6z M117.7,38.2H49.9v-5h67.8V38.2z M117.7,23.8H49.9v-5h67.8V23.8z" />
    </svg>
  );
};

DocumentsIcon.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired
};

DocumentsIcon.defaultProps = {
  size: 24,
  fill: "#000"
};
