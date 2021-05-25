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

    <Title>Register for NHLBI BioData Catalyst Access</Title>

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
        <b>
          We developed this{" "}
          <ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/">
            overview
          </ExternalLink>{" "}
          to help you get started.
        </b>
      </Paragraph>
    </section>
    <section>
      <Heading>Choosing a Workspace</Heading>

      <Paragraph>
        Users of BioData Catalyst workspaces will need to choose either the{" "}
        <em>Powered by Seven Bridges</em> or <em>Powered by Terra</em> workspace
        environments to apply for Pilot Funding cloud credits and/or request
        additional cloud credits. To learn more about what each workspace has to
        offer, follow the links below:
      </Paragraph>

      <BulletedList>
        <ListItem
          primary={
            <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/platforms/terra">
              BioData Catalyst Powered by Terra
            </ExternalLink>
          }
        />
        <ListItem
          primary={
            <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/platforms/seven-bridges">
              BioData Catalyst Powered by Seven Bridges
            </ExternalLink>
          }
        />
      </BulletedList>
      <Paragraph>Note on registration process:</Paragraph>
      <BulletedList>
        <ListItem
          primary={
            "This registration process provides login credentials for the NHLBI BioData Catalyst Help Desk system, but not for all components of the BioData Catalyst ecosystem."
          }
        />
        <ListItem
          primary={
            <span>
              Users need to create separate accounts to access different
              workspace environments, such as{" "}
              <em>BioData Catalyst Powered by Seven Bridges</em> or{" "}
              <em>BioData Catalyst Powered by Terra.</em>
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              Your eRA Commons ID is the common authentication method used
              throughout the ecosystem. To learn more about eRA Commons IDs,
              follow this{" "}
              <ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/terra/account-setup/managing-costs">
                link.
              </ExternalLink>
            </span>
          }
        />
        <ListItem
          primary={
            "Information on this form is considered Personally Identifiable Information (PII). If you wish to protect your privacy, you may send this information securely through external means such as US mail. "
          }
        />
        <ListItem
          primary={
            "During monitoring, information may be examined, recorded, copied and used for authorized purposes. All information placed on or sent over this system may be monitored."
          }
        />
      </BulletedList>
    </section>

    <section>
      <Heading>NHLBI BioData Catalyst Cloud Credit Program</Heading>

      <Paragraph>
        The NHLBI BioData Catalyst Cloud Credit Program offers users the
        opportunity to apply for additional cloud credits to support research
        projects in the heart, lung, blood, and sleep fields. Cloud credits are
        awarded on a per project basis, so if multiple users are working
        together on a larger project the group should submit one application.
        All individuals involved in a project will be able to make use of
        awarded cloud credits through a shared billing group on either BioData
        Catalyst Powered by Seven Bridges or BioData Catalyst Powered by Terra.
        Users can submit an application using the{" "}
        <AnchorLink to="/resources/cloud-credits#cloud-credits-form">
          Cloud Credit Request Form
        </AnchorLink>{" "}
        below.
      </Paragraph>

      <Paragraph>
        Requests for additional cloud credits will be reviewed and decided as
        soon as possible.
      </Paragraph>
    </section>
    <section>
      <Heading>Registration Form</Heading>

      <Paragraph>
        By completing this form you are agreeing to the policies and usage
        agreements represented on the{" "}
        <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/about">
          NHLBI BioData Catalyst website
        </ExternalLink>{" "}
        and documentation. This includes, but is not limited to, a prohibition
        against sharing account names and passwords.
      </Paragraph>
    </section>

    <br />

    <section>
      <EcoSystemForm id="ecosystem-form" />
    </section>
  </PageContent>
);

export default RegistrationPage;
