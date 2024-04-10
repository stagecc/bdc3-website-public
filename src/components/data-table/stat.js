import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .value {
    font-size: 250%;
    font-weight: bold;
    color: var(--color-crimson);
  }
  & .name {
    font-size: 125%;
    font-weight: bold;
    font-style: italic;
    color: var(--color-blueberry);
  }
`;

export const Stat = ({ name, value }) => {
  return (
    <Wrapper>
      <div className="value">{value}</div>
      <div className="name">{name}</div>
    </Wrapper>
  );
};
