import PropTypes from "prop-types";
import styled from "styled-components";

export const Card = styled.div`
  // & * { border: 1px solid #f99; }
  overflow: hidden;
  ${props =>
    props.metaAlert ? `box-shadow: 0 0 8px 4px rgba(186, 194, 204, 0.5);` : `box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);`}
  margin-bottom: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevate: PropTypes.bool.isRequired
};

Card.defaultProps = {
  elevate: true
};
