import styled from "styled-components";

export const DetailsPanel = styled.div(({ compact }) => `
  flex: ${ compact ? "1 0 50%" : "3"};
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`);

export const DetailWrapper = styled.div(({ dataset, compact }) => `
  position: absolute;
  height: 100%;
  width: 100%;
  padding: ${ compact ? "0px 1.2rem" : "0px 3rem"};
  flex: 2;
  @media screen and (min-width: 992px) {
    flex: 3;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`);

export const Headline = styled.h1(({ compact }) => `
  padding: 0 1rem;
  font-size: 1.8rem;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 360px) {
    font-size: 1.5rem;
  }
  text-align: center;
  color: #eee;
  padding-bottom: 0;
  margin: 0;
  text-shadow: 8px 8px 10px #00000066;
`);

export const Description = styled.p(({ compact }) => `
  color: #eee;
  background-color: #00000086;
  padding: 0.5rem 1rem;
  text-align: center;
  letter-spacing: 0.5px;
  line-height: ${ compact ? "1.5" : "1.3" };
  font-size: 1.1rem;
  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 360px) {
    font-size: 0.8rem;
  }
`);

export const TestimonialWrapper = styled(DetailWrapper)`
  max-width: 1200px;
`

export const Quote = styled(Headline)`
  font-size: 1.8rem;
  line-height: 1.5;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 360px) {
    font-size: 1.5rem;
  }
`
export const Attribution = styled(Description)`
  font-size: 1.1rem;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (min-width: 1200px) {
    font-size: 1.3rem;
  }
`