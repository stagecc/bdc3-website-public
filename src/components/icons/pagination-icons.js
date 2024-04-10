import React from "react";

export const FirstPageIcon = ({ size, ...rest }) => {
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
      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
      <path d="M24 24H0V0h24v24z" fill="none" />
    </svg>
  );
};

export const LastPageIcon = ({ size, ...rest }) => {
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
      <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
      <path d="M0 0h24v24H0V0z" fill="none" />
    </svg>
  );
};
