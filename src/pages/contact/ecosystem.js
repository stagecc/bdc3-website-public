import React from "react";
import { SEO } from "../../components/seo";
import { Link } from "gatsby";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { ExternalLink } from "../../components/link";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { EcoSystemForm } from "../../components/form";
import { BulletedList, ListItem } from "../../components/list";

const RegistrationPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="NHLBI BioData Catalyst Access" description="" keywords="" />

    <Title>Join the NHLBI BioData Catalyst Community</Title>

    <section>
      <Paragraph>
        Thank you for your interest in joining the NHLBI BioData Catalyst
        community of practice. The ecosystem provides{" "}
        <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/resources/services/">
          tools, applications, and workflows
        </ExternalLink>{" "}
        in secure workspaces to support data analysis on a range of{" "}
        <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/resources/data/">
          hosted datasets.{" "}
        </ExternalLink>
      </Paragraph>
      <Paragraph>
        Joining this community will grant access to:
        <br />
        <br />
        <BulletedList>
          <ListItem
            primary={
              <span>
                BioData Catalyst Ecosystem&nbsp;
                <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/platforms/terra">
                  Help Desk
                </ExternalLink>
              </span>
            }
          />
          <ListItem
            primary={
              <span>
                BioData Catalyst Ecosystem&nbsp;
                <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/platforms/seven-bridges">
                  Forums
                </ExternalLink>
              </span>
            }
          />{" "}
          <ListItem
            primary={
              <span>
                Future updates on new releases, tips and tricks, and events and
                opportunities of interest
              </span>
            }
          />
        </BulletedList>
      </Paragraph>
    </section>
    <section>
      <Heading>Sign up now</Heading>

      <Paragraph>
        Information on this form is considered Personally Identifiable
        Information (PII). If you wish to protect your privacy, you may send
        this information securely through external means such as US mail. During
        monitoring, information may be examined, recorded, copied and used for
        authorized purposes. All information placed on or sent over this system
        may be monitored.
      </Paragraph>
    </section>

    <br />

    <section>
      <EcoSystemForm id="ecosystem-form" />
    </section>
  </PageContent>
);

export default RegistrationPage;
