import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { useFellows } from "../../hooks";
import { Link } from "../../components/link";
import { kebabCase } from "../../utils";
import {
  FellowsLinkList,
  FellowsLinkListItem,
  FellowsProfile
} from "../../components/fellows";

const FellowsCohort1Page = () => {
  const { cohortOne } = useFellows();

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="Cohort I Fellows" description="" keywords="" />

      <Title>Cohort I Fellows</Title>

      <section id="overview">
        <Paragraph>
          The NHLBI BioData Catalyst Fellows Program provides researchers,
          especially early-career researchers, the opportunity to receive
          funding to support research on novel and innovative data science and
          data-focused research problems.
        </Paragraph>
        <Paragraph>
          Cohort I Fellows will work on the BioData Catalyst Ecosystem from
          March 2020 to June 2021. Read what our{" "}
          <Link to="https://drive.google.com/file/d/12MdA9L_0Ouf6CI08zVFxlAOQuN8Wxh_9/view?usp=sharing">
            Cohort I Fellows have said
          </Link>{" "}
          about the NHLBI BioData Catalyst ecosystem.
        </Paragraph>
      </section>

      <section id="fellows">
        <Heading>Meet the Fellows</Heading>

        <FellowsLinkList>
          {cohortOne.map(fellow => (
            <FellowsLinkListItem
              key={kebabCase(fellow.name.replace(/,.+$/, ""))}
              path={`#${kebabCase(
                fellow.name.replace(/,.+$/, "")
              )}`}
              text={fellow.name}
            />
          ))}
        </FellowsLinkList>

        {cohortOne.map(fellow => (
          <FellowsProfile
            key={kebabCase(fellow.name.replace(/, Ph\.D\.$/, ""))}
            name={fellow.name}
            institution={fellow.university}
            bio={fellow.bio}
            projectTitle={fellow.project.title}
            projectAbstract={fellow.project.abstract}
            photo={fellow.photo.childImageSharp.fixed}
          />
        ))}
      </section>
    </PageContent>
  );
};

export default FellowsCohort1Page;
