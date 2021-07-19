import PropTypes from "prop-types";
import styled from "styled-components";

export const InputGroup = styled.div(
  ({ theme, flexDirection }) => `
  display: flex;
  flex-direction: ${flexDirection};
  & > * {
    border-radius: 0;
  }
  & > *:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  & > *:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`
);

InputGroup.propTypes = {
  flexDirection: PropTypes.oneOf(["row", "column"])
};

InputGroup.defaultProps = {
  flexDirection: "row"
};
