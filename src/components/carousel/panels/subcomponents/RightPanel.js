import styled from "styled-components";

export const DataPanel = styled.div(({ compact, dataset }) => `
  height: 100%;
  width: 100%;
  display: block;
  flex: ${ dataset & compact ? "1 0 50%" : dataset ? "3" : "1" };
  max-width: ${ compact ? "none" : "800px" };
  background-color: #00000066;
  text-align: center;
  @media screen and (min-width: 1000px) {
    padding-right: 2rem;
    padding-left: 1rem;
  }
  @media screen and (min-width: 1400px) {
    padding-right: 8rem;
  }
`);

export const DataWrapper = styled.div(({ compact }) => `
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${ compact ? "start" : "center" };
  align-items: stretch;
  position: relative;
  padding: 1rem;
`);

export const DatumName = styled.p`
  font-size: 1rem;
  color: #eee;
  letter-spacing: 0.3px;

`;

export const DatumValue = styled.span(({ compact }) => `
  font-weight: bold;
  // color: var(--color-crimson);
  color: #f99;
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
  }
  @media screen and (min-width: 868px) {
    font-size: 2rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 360px) {
    font-size: 1.3rem;
  }
`);

export const Datum = styled.span(({ active, compact }) => `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 500ms;
  transform: translateX(${ active ? "0%" : "100%" });
  padding-bottom: 1rem;
  &:first-child {
    padding-top: ${ compact ? "0.5rem" : "2rem" };
  }
  &:last-child {
    padding-bottom: 2rem;
  }
`);

export const CarouselBulletedList = styled.ul(({ compact }) => `
  list-style: none; /* Remove default bullets */
  text-align:  ${ compact ? "center" : "left" };
  padding-inline-start: 0px;
  @media screen and (min-width: 768px) {
    margin: 0 0.5rem 0 1rem;
  }
  @media screen and (min-width: 1200px) {
    margin: 0 1rem 0 3rem;
  }
  @media screen and (max-width: 480px) {
    margin: 0rem;
  }
`)
;

export const CarouselListItem = styled.li(({ compact }) => `
  line-height: ${ compact ? "1.3" : "1.5" };
  color: #eee;
  padding: ${ compact ? "0.3rem 0" : "0.5rem 0" };
  &::before {
    content: '•';
    margin: 0 1rem 0 0; 
    color: #f99;
  }
  text-indent: ${ compact ? "0 ": "-2.4rem"};
  margin: 0 1rem;
  font-size: 1.4rem;
  @media screen and (min-width: 768px) {
    font-size: 1.3rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 380px) {
    font-size: 1.15rem;
  }
`)