import React from "react";
import styled from "styled-components";

const inputStyle = `
    flex: 1;
    padding: 0.5rem;
    outline: none;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-lightgrey);
    transition: boroder-color 250ms, filter 250ms;
    &:focus {
        border-color: var(--color-eggplant);
        filter: drop-shadow(0 0 0.1rem var(--color-eggplant));
    }
`;

export const Form = styled.form`
  padding: 1rem 0.5rem;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  & > label {
    padding: 0.5rem 0;
    font-weight: bold;
  }
`;

export const TextInput = styled.input.attrs(props => ({ type: props.type }))`
  ${inputStyle}
`;

const Adornment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid #f99;
  min-height: 100%;
  width: 1.5rem;
`;

export const AdornedInput = ({ adornment, ...props }) => {
  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "stretch" }}>
      {adornment && <Adornment>{adornment}</Adornment>}
      <TextInput {...props} style={{ flex: 1, width: "100%" }} />
    </div>
  );
};

export const Select = styled.select`
  ${inputStyle}
`;

export const Option = styled.option``;

export const TextArea = styled.textarea`
  resize: vertical;
  height: 200px;
  min-height: 200px;
  max-height: 800px;
  ${inputStyle}
`;

export const HelpText = styled.small`
  padding: 0.25rem 0;
  font-style: italic;
`;

export const ErrorText = styled.small`
  padding: 0.25rem 0;
  font-style: italic;
  color: red;
`;
