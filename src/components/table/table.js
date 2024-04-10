import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  & td {
    padding: 0.5rem;
    margin: 0;
  }
  & tr {
    border: 1px solid #ccd;
  }
  & tr:nth-child(2n) {
    // background-color: var(--color-grey)33;
  }
`;
