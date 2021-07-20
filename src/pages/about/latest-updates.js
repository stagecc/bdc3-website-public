import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { Title, Heading, Meta } from "../../components/typography";
import { InlineList2 } from "../../components/list";
import { TagLink } from "../../components/link";
// import { ClockIcon } from "../components/icons";
import { useWindowWidth } from "../../hooks";

const ArticlePreview = styled.article`
  margin: 4rem 0;
`;

const Details = styled(Meta)`
  display: flex;
  flex-direction: ${(props) => (props.compact ? "column" : "row")};
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

const Tags = styled(Meta)``;

const PublishDate = styled.span`
  flex: 1;
`;

const TimeToRead = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewsListItem = ({ date, path, title, timeToRead, tags, content }) => {
  const { isCompact } = useWindowWidth();
  return (
    <ArticlePreview>
      <Heading style={{ lineHeight: 1.5 }}>
        <Link to={path}>{title}</Link>
      </Heading>
      <Details compact={isCompact}>
        <PublishDate>Published on {date}</PublishDate>
        <TimeToRead>&nbsp; {timeToRead} minute read</TimeToRead>
      </Details>
      <Tags>
        <InlineList2
          title="Tags"
          items={tags.map((tag) => (
            <TagLink tag={tag} />
          ))}
        />
      </Tags>
      <main className="news-snippet">{content}</main>
    </ArticlePreview>
  );
};

const NewsPage = ({ data }) => {
  const todaysDate = new Date();
  // filter out future (and thus unpublished) news items
  const news = data.allMarkdownRemark.edges.filter(
    ({ node }) => new Date(node.frontmatter.date) < todaysDate
  );

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="BioData Catalyst News"
        description="Read about news and current events that are related to BioData Catalyst."
        keywords={["news", "events", "press"]}
      />
      <Title>Latest Updates</Title>
      {news.map(({ node }) => (
        <NewsListItem
          key={node.frontmatter.path}
          title={node.frontmatter.title}
          path={node.frontmatter.path}
          date={node.frontmatter.date}
          timeToRead={node.timeToRead}
          tags={node.frontmatter.tags}
          content={node.excerpt}
        />
      ))}
    </PageContent>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/news/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            tags
          }
        }
      }
    }
  }
`;

export default NewsPage;
