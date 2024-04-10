import React from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

export const FellowsLinkList = styled.div`
  -moz-columns: 250px 3;
  -webkit-columns: 250px 3;
  columns: 250px 4;
  margin: 2rem auto;
  padding: 0;
  line-height: 1.5;
  & > * {
    display: block;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const FellowsLinkListItem = ({ path, text }) => (
  <a href={path} onClick={() => navigate(path)}>{text}</a>
);
