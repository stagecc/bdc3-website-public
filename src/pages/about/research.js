import React, { Fragment } from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Heading, Paragraph, Title } from "../../components/typography";
import { Link } from "../../components/link";
import { graphql } from "gatsby";

const ResearchPage = ({ data }) => {
  const publications = data.publications.nodes;

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="BioData Catalyst Published Research"
        description="View published research that has been built on BioData Catalyst"
        keywords={["pubilsh", "research"]}
      />
      <Title>Published Research</Title>

      {publications.map(({ id, title, date, location, url, bdcAuthors }) => (
        <Fragment key={id}>
          <Heading>
            <Link to={url}>{title}</Link>
          </Heading>
          <div
            style={{
              borderLeft: "3px solid var(--color-lightgrey)",
              paddingLeft: "1rem",
            }}
          >
            <Paragraph>
              {title ===
              "Streamlining statistical reproducibility: NHLBI ORCHID clinical trial results reproduction"
                ? "BioData Catalyst Consortium Authors:"
                : "BioData Catalyst Contributor:"}{" "}
              {bdcAuthors.map((author, i) => (
                <span>
                  {author}
                  {i + 1 < bdcAuthors.length ? "," : ""}{" "}
                </span>
              ))}
            </Paragraph>
            <Paragraph>
              Published on {date} in <em>{location}</em>
            </Paragraph>
          </div>
          <br />
        </Fragment>
      ))}
    </PageContent>
  );
};

export const query = graphql`
  query {
    publications: allPublicationsYaml(sort: { fields: date, order: DESC }) {
      nodes {
        id
        title
        date(formatString: "MMMM Do, YYYY")
        location
        url
        bdcAuthors
      }
    }
  }
`;

export default ResearchPage;
