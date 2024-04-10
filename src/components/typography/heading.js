import styled from "styled-components";
import PropTypes from "prop-types";

export const Heading = styled.h2`
    color: ${props => (props.light ? "#eef" : "var(--color-blueberry)")};
    text-align: center;
    ${props => props.left && "text-align: left;"}
    ${props => props.noMargin && "margin: 0;"}
    ${props => props.eventHeading && "font-size: 130%;"}
    ${props => props.eventHeading && "line-height: 1.5;"}
    @media screen and (min-width: 767px) {
        text-align: left;
        ${props => props.center && "text-align: center;"}
        ${props => props.right && "text-align: right;"}
        ${props => props.noMargin && "margin: 0;"}
    }
`;

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};
