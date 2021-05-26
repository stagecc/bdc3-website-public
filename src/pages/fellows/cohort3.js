import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { useFellows } from "../../hooks";
import { kebabCase } from "../../utils";
import {
  FellowsLinkList,
  FellowsLinkListItem,
  FellowsProfile
} from "../../components/fellows";

const FellowsCohort3Page = () => {
  const { avatar, cohortThree } = useFellows();

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="Cohort III Fellows" description="" keywords="" />

      <Title>Cohort III Fellows</Title>

      <section id="overview">
        <Paragraph>
          The NHLBI BioData Catalyst Fellows Program provides researchers,
          especially early-career researchers, the opportunity to receive
          funding to support research on novel and innovative data science and
          data-focused research problems.
        </Paragraph>
        <Paragraph>
          Cohort 3 Fellows will work on the BioData Catalyst Ecosystem from
          March 2021 to February 2022.
        </Paragraph>
      </section>

      <section id="fellows">
        <Heading>Meet the Fellows</Heading>

        <FellowsLinkList>
          {cohortThree.map(fellow => (
            <FellowsLinkListItem
              key={kebabCase(fellow.name.replace(/,.+$/, ""))}
              path={`/fellows/cohort3#${kebabCase(
                fellow.name.replace(/,.+$/, "")
              )}`}
              text={fellow.name}
            />
          ))}
        </FellowsLinkList>

        {cohortThree.map(fellow => (
          <FellowsProfile
            key={kebabCase(fellow.name.replace(/, Ph\.D\.$/, ""))}
            name={fellow.name}
            institution={fellow.university}
            bio={fellow.bio}
            projectTitle={fellow.project.title}
            projectAbstract={fellow.project.abstract}
            photo={
              fellow?.photo?.childImageSharp?.fixed
                ? fellow.photo.childImageSharp.fixed
                : avatar.childImageSharp.fixed
            }
          />
        ))}
      </section>
    </PageContent>
  );
};

export default FellowsCohort3Page;
