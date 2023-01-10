import styled from "styled-components";

export const DataPanel = styled.div(({ compact, dataset }) => `
  height: 100%;
  width: 100%;
  display: block;
  flex: ${ dataset ? "3" : "1" };
  max-width: ${ compact ? "none" : "800px" };
  background-color: #00000066;
  text-align: center;
`);

export const DataWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  position: relative;

`;

export const DatumName = styled.span`
  font-size: 90%;
  color: #eee;
`;

export const DatumValue = styled.span(({ compact }) => `
  font-size: ${ compact ? "150%" : "300%" };
  font-weight: bold;
  // color: var(--color-crimson);
  color: #f99;
`);

export const Datum = styled.span(({ active }) => `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 500ms;
  transform: translateX(${ active ? "0%" : "100%" });
  padding-bottom: 1rem;
  &:first-child {
    padding-top: 1rem;
  }
  &:last-child {
    padding-bottom: 2rem;
  }
`);

export const CarouselBulletedList = styled.ul`
  list-style: none; /* Remove default bullets */
  margin: 1rem;
  text-align: left;
`
;

export const CarouselListItem = styled.li(({ compact }) => `
  font-size: ${ compact ? "90%" : "130%" };
  line-height: ${ compact ? "1.3" : "1.5" };
  color: #eee;
  padding:${ compact ? "0.3rem" : "0.5rem" };
  &::before {
    content: '•';
    margin: 0 10px;
    color: #f99;
  }
`)