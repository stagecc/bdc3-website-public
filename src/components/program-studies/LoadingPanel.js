import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--color-crimson);
`

export const LoadingPanel = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

const Spinner = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5"
        strokeWidth="8"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M50 75C36.1929 75 25 63.8071 25 50C25 36.1929 36.1929 25 50 25"
        strokeWidth="8"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
