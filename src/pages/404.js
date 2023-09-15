import React from "react";
import styled, { keyframes } from "styled-components";
import { PageContent } from "../components/layout";
import { Title, Paragraph } from "../components/typography";
import { Seo } from "../components/seo";

const INTERVAL = 3000; // milliseconds

const throb = keyframes`
    0% {
        opacity: 0.25;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
    100% {
        opacity: 0.25;
        transform: scale(1);
    }
`;
const AnimatedNode = styled.div`
  animation: ${throb} ${2 * INTERVAL}ms ease-in-out infinite;
  position: relative;
  font-size: 48pt;
  margin: 0.5rem;
  transform-origin: center center;
  font-weight: bold;
  color: ${props => (props.color ? props.color : "#ccc")};
`;

const Tray = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & ${AnimatedNode} {
    ${props => {
      const interval = Math.floor(INTERVAL / props.length);
      return [...Array(props.length).keys()].map(
        i => `&:nth-child(${i + 1}) { animation-delay: ${i * interval}ms; }`
      );
    }}
  }
`;

const NotFoundAnimation = ({ color }) => {
  const notFoundMessage = "404";
  return (
    <Tray length={notFoundMessage.length}>
      {notFoundMessage.split("").map(char => (
        <AnimatedNode color={color}>{char}</AnimatedNode>
      ))}
    </Tray>
  );
};

const NotFoundPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <Seo title="404: Not found" />

    <Title center>Oh no!</Title>

    <NotFoundAnimation color="var(--color-crimson)" />

    <Paragraph center>We've led you astray!</Paragraph>
  </PageContent>
);

export default NotFoundPage;
