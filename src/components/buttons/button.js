import styled from "styled-components";
import PropTypes from "prop-types";

export const Button = styled.button(
  ({ small, light, fullWidth }) => `
    background-color: ${light ? "#fff" : "var(--color-crimson)"};
    border-radius: 4px;
    display: inline-block;
    border-width: 1px;
    border-style: solid;
    border-color: ${light ? "var(--color-crimson)" : "transparent"};
    color: ${light ? "var(--color-crimson) !important" : "#fff"};
    padding: ${small ? "0.5rem 1rem" : "1rem 1rem"};
    font-size: ${small ? "80%" : "100%"};
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    cursor: pointer;
    // possibly extend to allow fullWidth prop?
    // display: flex;
    // justify-content: center;
    // align-items: center;
    ${fullWidth ? `width: 100%;` : undefined}
    position: relative;
    transition: filter 250ms;
    &:hover, &:focus {
        filter: brightness(1.2);
    }
`
);

Button.propTypes = {
  light: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired
};

Button.defaultProps = {
  light: false,
  small: false,
  fullWidth: false
};
