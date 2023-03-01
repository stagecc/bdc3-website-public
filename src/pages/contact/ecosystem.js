import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { Link } from "../../components/link";
import { EcoSystemForm } from "../../components/form";
import { BulletedList, ListItem } from "../../components/list";

const RegistrationPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Join the BDC Community" description="" keywords="" />

    <Title>Join the BDC Community</Title>

    <section>
      <Paragraph>
        Thank you for your interest in joining the BDC
        community of practice. The ecosystem provides{" "}
        <Link to="https://biodatacatalyst.nhlbi.nih.gov/resources/services/">
          tools, applications, and workflows
        </Link>{" "}
        in secure workspaces to support data analysis on a range of{" "}
        <Link to="https://biodatacatalyst.nhlbi.nih.gov/resources/data/">
          hosted datasets.{" "}
        </Link>
      </Paragraph>
      <Paragraph>Joining this community will grant access to:</Paragraph>
      <BulletedList>
        <ListItem
          primary={
            <span>
              BDC Ecosystem&nbsp;
              <Link to="https://biodatacatalyst.nhlbi.nih.gov/contact/">
                Help Desk
              </Link>
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              BDC Ecosystem&nbsp;
              <Link to="https://bdcatalyst.freshdesk.com/support/discussions/60000024585">
                Forums
              </Link>
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
