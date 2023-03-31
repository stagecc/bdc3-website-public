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
  background: linear-gradient(180deg, #21568a 0%, #314f6e 100%);
  justify-content: space-between;
  transition: background-color 200ms ease-out;
  &:hover, &:focus-within {
    background-color: rgba(33, 86, 138, 0.7);
    color: rgba(255, 255,255, 0.7)
  }
`

const NewsCardHeading = styled.h2`
  line-height: 1.5; 
  letter-spacing: 0.5px;
  text-decoration: none;
  font-weight: '400';
  font-size: '100%';
  color: #fff;
  &:hover, &:focus {
    text-decoration: none;
  }

`


export const NewsCard = ({ newsItem }) => {
  return (
    <NewsCardWrapper >
        <NewsCardHeading >
          {newsItem.newsTitle}
        </NewsCardHeading>

      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Paragraph style={{letterSpacing: "1px", color: '#fff'}}>
          {newsItem.newsDate}
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
