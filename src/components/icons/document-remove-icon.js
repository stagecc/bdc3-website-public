import React from "react";

export const DocumentRemoveIcon = ({ size, fill, ...rest }) => {
  return (
    <svg
      {...rest}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
    >
      <path id="path2" d="M0 0h24v24H0z" fill="none" />
      <path
        id="path4"
        d="m14 2h-8c-1.1 0-1.99 0.9-1.99 2l-0.01 16c0 1.1 0.89 2 1.99 2h12.01c1.1 0 2-0.9 2-2v-12zm2 14h-8v-2h8zm-3-7v-5.5l5.5 5.5z"
        fill={fill}
      />
    </svg>
  );
};
