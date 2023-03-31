import React from "react";
import { Card, CardHeader, CardBody } from ".";
import { Heading, Paragraph } from "../../components/typography";
import styled from "styled-components";
import { ExternalLinkIcon } from "../icons";

//add animation to make card grow slightly on hover
//include onFocus state too
const NewsCardWrapper = styled.div`
  overflow: hidden;
  ${props =>
    props.metaAlert ? `box-shadow: 0 0 8px 4px rgba(186, 194, 204, 0.5);` : `box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);`}
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--color-blueberry) 0%, #314f6e 100%);
  justify-content: space-between;
  transition: transform 200ms ease-out;
  &:hover, &:focus {
    transform: scale(1.01);
    color: rgba(255, 255,255, 0.7)
  }
`
//add a filter on it to change the color

const NewsCardHeading = styled.h2`
  line-height: 1.5; 
  letter-spacing: 0.5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 150%;
  color: #fff;
  &:hover, &:focus {
    text-decoration: none;
  }

`


export const NewsCard = ({ newsItem }) => {
  return (
    <NewsCardWrapper >
      <div>
        <NewsCardHeading >
          {newsItem.newsTitle}
        </NewsCardHeading>
        <Paragraph style={{letterSpacing: "1px", color: '#fff'}}>
          {newsItem.newsDate}
        </Paragraph>

      </div>

      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Paragraph style={{letterSpacing: "1px", color: '#fff'}}>
          {newsItem.newsSource}
        </Paragraph>
        <ExternalLinkIcon
          fill={"#eee"}
          size={14}
          style={{ marginLeft: "0.25rem" }}
        />
      </div>

    </NewsCardWrapper>
  );
};
