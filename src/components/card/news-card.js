import React from "react";
import { Card, CardHeader, CardBody } from ".";
import { Heading, Paragraph } from "../../components/typography";
import styled from "styled-components";
import { ExternalLinkIcon } from "../icons";
import { Link } from "../../components/link"
//add animation to make card grow slightly on hover
//include onFocus state too

//make newscard warpper a styled Link?

const NewsCardLink = styled(Link)`
  overflow: hidden;
  margin-bottom: 3rem;
  height: 100%;
  background: linear-gradient(180deg, var(--color-blueberry) 0%, #314f6e 100%);
  transition: transform 200ms ease-out;
  &:hover, &:focus {
    transform: scale(1.05);
  };
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NewsCardWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 3rem;
  height: 100%;
  padding: 1.5rem 2rem;

  background: linear-gradient(180deg, var(--color-blueberry) 0%, #314f6e 100%);
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
    <NewsCardWrapper>
    <NewsCardLink to={newsItem.newsLink} noIcon>

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
        {/* <ExternalLinkIcon
          fill={"#555"}
          size={14}
          style={{ marginLeft: "0.25rem" }}
        /> */}
      </div>

    </NewsCardLink>
    </NewsCardWrapper>
  );
};
