import PropTypes from "prop-types";
import styled from "styled-components";

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.fgColor ? props.fgColor : "inherit")};
  background-color: ${props => (props.bgColor ? props.bgColor : "inherit")};
  // font-weight: bold;
  text-align: center;
  padding: 0.5rem 2rem;
  position: relative;
  font-size: 133%;
  min-height: 4rem;
`;

CardHeader.propTypes = {
  fgColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

CardHeader.defaultProps = {
  fgColor: "#fff",
  bgColor: "var(--color-crimson)",
  children: ""
};
