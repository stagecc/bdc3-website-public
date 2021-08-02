import React from "react"
import styled from "styled-components"
import { AnimateOnMount } from "../../components/anim"
import { SEO } from "../../components/seo"
import { graphql, Link } from "gatsby"
import { Title, Meta } from "../../components/typography"
import { InlineList } from "../../components/list"
import { TagLink } from "../../components/link"
import { Module } from "../../components/layout"
import { Visible } from "react-grid-system"
import { HorizontalRule } from "../../components/horizontal-rule"

const EventMetadataWrapper = styled.div`
  ${Meta} {
    margin: 0;
  }
`

export default ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { prev, next } = pageContext
  const { frontmatter, html } = markdownRemark
  const {
    title,
    date,
    display_date,
    time,
    location,
    tags,
    url,
    urlLabel,
    fabricHosted,
    presenter,
    presentation_link,
    seo,
  } = frontmatter

  return (
    <AnimateOnMount>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <div className="event-item-container">
        <div className="event-item">
          <Title>{title}</Title>

          <EventMetadataWrapper>
            <Meta>
              <b>Date</b>: {display_date ? display_date : date}
            </Meta>
            {time && <Meta>Time: {time}</Meta>}
            <Meta>
              <b>Location</b>: {location}
            </Meta>
            {fabricHosted ? (
              <Meta>
                <b>{urlLabel ? urlLabel : "Registration"}</b>:{" "}
                <a href={url} target="_blank" rel="noreferrer noopener">
                  {url}
                </a>
              </Meta>
            ) : (
              <Meta>
                <b>Event Website</b>:{" "}
                <a href={url} target="_blank" rel="noreferrer noopener">
                  {url}
                </a>
              </Meta>
            )}
            {
              presenter && (
                <Meta>
                <b>Presenter</b>:{" "} {presenter}
                </Meta>
              )
            }
            {
              presentation_link && (
                <Meta>
                <b>Presentation Link</b>:{" "}
                <a href={presentation_link} target="_blank" rel="noreferrer noopener">
                  {presentation_link}
                </a>
                </Meta>
              )
            }
            <Meta>
              <InlineList
                title="Tags"
                items={tags.map((tag) => (
                  <TagLink tag={tag} />
                ))}
              />
            </Meta>
          </EventMetadataWrapper>

          <Module title="Event Details">
            <div
              className="event-content"
              dangerouslySetInnerHTML={{
                __html: html || "No details to display.",
              }}
            />
          </Module>
        </div>
      </div>

      <HorizontalRule />

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          {prev && (
            <Link to={prev.frontmatter.path}>
              PREVIOUS{" "}
              <Visible md lg xl>
                EVENT
              </Visible>{" "}
              <br />
              <Meta>
                {prev.frontmatter.title}
                <br />
                <small>on {prev.frontmatter.date}</small>
              </Meta>
            </Link>
          )}
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          {next && (
            <Link to={next.frontmatter.path}>
              NEXT{" "}
              <Visible md lg xl>
                EVENT
              </Visible>{" "}
              <br />
              <Meta>
                {next.frontmatter.title}
                <br />
                <small>on {next.frontmatter.date}</small>
              </Meta>
            </Link>
          )}
        </div>
      </div>
    </AnimateOnMount>
  )
}

export const newsItemQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        display_date
        time
        location
        title
        urlLabel
        url
        tags
        fabricHosted
        presenter
        presentation_link
        seo {
          title
          description
          keywords
        }
      }
    }
  }
`
