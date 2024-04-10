import React from "react";
import PropTypes from "prop-types";

export const VideosIcon = ({ size, fill, ...rest }) => {
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
      viewBox="0 0 152.15 114.28"
    >
      <path
        d="M147.22,11.59H23.65a4.09,4.09,0,0,0-4.09,4.08v86.81a4.09,4.09,0,0,0,4.09,4.08H147.22a4.09,4.09,0,0,0,4.09-4.08V15.67A4.09,4.09,0,0,0,147.22,11.59ZM67.37,86.67V30.27l48.84,28.2Z"
        transform="translate(-9.25 -1.52)"
      />
      <path
        d="M155.64,1.52H15A5.76,5.76,0,0,0,9.25,7.27V110A5.77,5.77,0,0,0,15,115.8H155.64a5.77,5.77,0,0,0,5.75-5.76V7.27A5.76,5.76,0,0,0,155.64,1.52Zm0,101a8.43,8.43,0,0,1-8.42,8.42H23.65a8.43,8.43,0,0,1-8.42-8.42V15.67a8.43,8.43,0,0,1,8.42-8.42H147.22a8.43,8.43,0,0,1,8.42,8.42Z"
        transform="translate(-9.25 -1.52)"
      />
    </svg>
  );
};

VideosIcon.propTypes = {
  size: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired
};

VideosIcon.defaultProps = {
  size: 24,
  fill: "#000"
};
