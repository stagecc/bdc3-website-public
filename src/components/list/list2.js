import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const InlineList2 = ({
  title,
  items,
  separator = " ",
  noItemsIndicator = " ∅",
}) => {
  return (
    <Fragment>
      {title && <strong>{title}: </strong>}
      {items.length > 0
        ? items.map((item, i) => (
            <Fragment key={i}>
              {item}
              {i < items.length - 1 && separator}
            </Fragment>
          ))
        : noItemsIndicator}
    </Fragment>
  );
};

InlineList2.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
  separator: PropTypes.string,
  noItemsIndicator: PropTypes.any,
};

export const UnorderedList = styled.ul`
    list-style-type: none;
    margin: 0 0 2rem 0;
    padding: 0;
    text-align: left;
    ${(props) => (props.center === true ? "text-align: center;" : undefined)}
    ${(props) => (props.right === true ? "text-align: right;" : undefined)}
    line-height: ${(props) => (props.dense ? "0.75" : "1.25")};
`;

export const ListTitle = styled.h4`
  color: var(--color-primary);
`;

export const ListItemContainer = styled.li`
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 0;
  line-height: 1.25;
`;

const PrimaryText = styled.span`
  font-weight: bold;
  display: block;
  color: var(--color-dark);
`;

const SecondaryText = styled.span`
  display: block;
  color: var(--color-grey);
`;

const TertiaryText = styled.span`
  display: block;
  color: var(--color-grey);
  font-size: 90%;
`;

export const ListItem2 = ({ primary, secondary, tertiary }) => {
  return (
    <ListItemContainer>
      <PrimaryText>{primary}</PrimaryText>
      <SecondaryText>{secondary}</SecondaryText>
      <TertiaryText>{tertiary}</TertiaryText>
    </ListItemContainer>
  );
};

ListItem2.propTypes = {
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node,
  tertiary: PropTypes.node,
};

export const List2 = ({ children, ...props }) => {
  return <UnorderedList {...props}>{children}</UnorderedList>;
};

List2.propTypes = {
  children: PropTypes.node.isRequired,
};
