import styled from "styled-components";
import PropTypes from "prop-types";

export const Paragraph = styled.p`
    text-align: inherit;
    ${props => props.noMargin && "margin-top: 0; margin-bottom: 0;"}
    font-weight: 400;
    line-height: 1.5;
    ${props => props.left && "text-align: left;"}
    ${props => props.center && "text-align: center;"}
    ${props => props.right && "text-align: right;"}
    ${props =>
      props.firstLineStyle
        ? `&::first-line { ${props.firstLineStyle} }`
        : undefined}
`;

Paragraph.propTypes = {
  children: PropTypes.node
};
