import styled from "styled-components";

export const DetailsPanel = styled.div`
  flex: ${props => (props.compact ? "1 0 50%" : "3")};
  height: 100%;
  width: 100%;
  position: relative;
`;

export const DetailWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0px 3rem;
  flex: 2;
  @media screen and (min-width: 992px) {
    flex: 4;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.dataset ? "flex-end" : "center")};
`;

export const Headline = styled.h1`
  font-size: ${props => (props.compact ? "1.3rem" : "1rem")};
  padding: 0 1rem;
  @media screen and (min-width: 768px) {
    font-size: 3vw;
  }
  @media screen and (min-width: 992px) {
    font-size: 180%;
  }
  text-align: center;
  color: #eee;
  padding-bottom: 0;
  margin: 0;
  text-shadow: 0 0 5px #00000066;
`;

export const Description = styled.p`
  color: #eee;
  background-color: #00000076;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: ${props => (props.compact ? "80%" : "85%")};
  letter-spacing: 0.5px;
  line-height: ${props => (props.compact ? "1.3" : "1")};
`;
