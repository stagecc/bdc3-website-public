import styled from "styled-components";
import PropTypes from "prop-types";

export const Subsubheading = styled.h4`
  color: red;
  line-height: 1.5;
  color: ${(props) => (props.light ? "#ccd" : "var(--color-blueberry)")};
  text-align: center;
  ${(props) => props.left && "text-align: left;"}
  @media screen and (min-width: 767px) {
    text-align: left;
    ${(props) => props.center && "text-align: center;"}
    ${(props) => props.right && "text-align: right;"}
    ${(props) => props.left && "text-align: left;"}
  }
`;

Subsubheading.propTypes = {
  children: PropTypes.node.isRequired,
};
