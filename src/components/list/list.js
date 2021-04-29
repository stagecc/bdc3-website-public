import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//

export const OrderedList = styled.ol`
  line-height: ${ props => props.dense ? '1.0' : '1.5' };
  padding: 1rem;
  // & > li::before {
  //   content: counter(item, decimal) '. ';
  //   counter-increment: item;
  // }
`

export const UnorderedList = styled.ul`
  list-style-type: none;
  margin: 0 0 2rem 0;
  padding: 0;
  text-align: left;
  ${ props => props.center === true ? 'text-align: center;' : undefined}
  ${ props => props.right === true ? 'text-align: right;' : undefined}
  line-height: ${ props => props.dense ? '0.75' : '1.25' };
`

//

export const BulletedList = styled(UnorderedList)(({ bullet }) => `
  list-style-type: ${ bullet };
  margin: 0 0 2rem 1rem;
`)

BulletedList.propTypes = {
  bullet: PropTypes.string.isRequired,
}

BulletedList.defaultProps = {
  bullet: 'disc',
}

//

export const ListTitle = styled.h4``

export const ListItemContainer = styled.li`
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
`

const PrimaryText = styled.span`
  display: block;
`

const SecondaryText = styled.span`
  display: block;
  font-size: 90%;
`

export const ListItem = ({ primary, secondary }) => {
  return (
    <ListItemContainer>
      <PrimaryText>{ primary }</PrimaryText>
      { secondary && <SecondaryText>{ secondary }</SecondaryText> }
    </ListItemContainer>
  )
}

ListItem.propTypes = {
  primary: PropTypes.node.isRequired,
  secondary: PropTypes.node,
}

//

export const List = ({ children, ordered, ...props }) => {
  const ListComponent = ordered ? OrderedList : UnorderedList
  return (
    <ListComponent { ...props }>
      { children }
    </ListComponent>
  )
}

List.propTypes = {
  dense: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  ordered: PropTypes.bool.isRequired,
}

List.defaultProps = {
  dense: false,
  children: PropTypes.node.isRequired,
  ordered: false,
}
