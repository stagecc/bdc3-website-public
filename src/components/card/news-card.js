import React from "react";
import { Card, CardHeader, CardBody } from "./";
import { Heading, Paragraph } from "../../components/typography";
import styled from "styled-components";
import { ExternalLinkIcon } from "../icons";
import { Link } from "../../components/link"
//add animation to make card grow slightly on hover
//include onFocus state too

//make newscard warpper a styled Link?

const NewsCardContainer = styled(Card)`
  overflow: hidden;
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
  padding: 1rem;
`

//add a filter on it to change the color

const NewsCardHeading = styled.h2`
  line-height: 1.5; 
  letter-spacing: 0.75px;
  text-decoration: none;
  font-weight: 400;
  font-size: 140%;
  color: #fff;
  &:hover, &:focus {
    text-decoration: none;
  };
  display: flex;
  justify-content: flex-start;
`


export const NewsCard = ({ newsItem }) => {
  const {
    newsTitle, 
    newsLink, 
    newsDate, 
    newsSource, 
    external, 
    paywall } = newsItem

  return (
    <Link to={newsLink} noIcon>
      <NewsCardContainer>
        <div>
          <NewsCardHeading>
            {newsTitle}
          </NewsCardHeading>
          <Paragraph style={{letterSpacing: "1px", color: '#fff', fontSize: '1rem'}}>
            {newsDate}
          </Paragraph>
        </div>

        <div style={{display: "block"}}>
          <Paragraph style={{letterSpacing: "1px", color: '#fff'}}>
            {newsSource}
          </Paragraph>
          <div style={{display:'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            {
              paywall && (
              <Paragraph style={{
                letterSpacing: "0.5px", 
                color: '#fff', 
                fontSize: '0.7rem',
                fontStyle: 'italic',
                marginRight: '1rem',
                marginBottom: 0}} >
                *This article is located behind a paywall or site that requires log in.
              </Paragraph>
              )
            }
            { external &&
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
        </div>
      </NewsCardContainer>
    </Link>
  );
};
