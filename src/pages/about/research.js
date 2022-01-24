import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title } from "../../components/typography";

const ResearchPage = ({ data }) => {
  const publications = data.publications.nodes

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="BioData Catalyst Published Research"
        description="View published research that has been built on BioData Catalyst"
        keywords={["pubilsh", "research"]}
      />
      <Title>Published Research</Title>

      {
        publications.map(publication => (
          <pre key={ publication.id } style={{ fontSize: '80%', backgroundColor: '#eee', padding: '1rem' }}>
            { JSON.stringify(publication, null, 2) }
          </pre>
        ))
      }
    </PageContent>
  );
};

export const query = graphql`query {
  publications: allPublicationsYaml {
    nodes {
      id
      title
      date
      location
    }
  }
}`;

export default ResearchPage;
