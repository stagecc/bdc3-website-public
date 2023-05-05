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
  transition: transform 700ms;
  filter: drop-shadow(6px 6px 4px var(--color-lightgrey));
  transition: filter 100ms ease-in;
  &:hover, &:focus {
    transform: translateY(-1.5px);
    filter: drop-shadow(10px 10px 6px var(--color-lightgrey));
  };
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 2rem;
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
    <NewsCardLink to={newsItem.newsLink} noIcon>

      <div>
        <NewsCardHeading >
          {newsItem.newsTitle}
        </NewsCardHeading>
        <Paragraph style={{letterSpacing: "1px", color: '#fff'}}>
          {newsItem.newsDate}
        </Paragraph>

      </div>

      <div style={{display: "block"}}>
        <Paragraph style={{letterSpacing: "1px", color: '#fff'}}>
          {newsItem.newsSource}
        </Paragraph>
        { newsItem.external &&
          (
            <div style={{textAlign: "right"}}>
              <ExternalLinkIcon
                fill={"#fff"}
                size={14}
                style={{ marginLeft: "0.25rem" }}
              />
            </div>
          )
        }
      </div>

    </NewsCardLink>
  );
};
