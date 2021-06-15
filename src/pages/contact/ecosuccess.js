import React from "react";
import { Link } from "gatsby";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import {
  Title,
  Heading,
  Paragraph,
  Subheading,
} from "../../components/typography";
import { BulletedList, ListItem } from "../../components/list";
import { Button, ButtonLink } from "../../components/buttons";
import { ExternalLink } from "../../components/link";

const SuccessPage = () => {
  return (
    <PageContent
      width="95%"
      maxWidth="1200px"
      center
      gutters
      style={{ position: "relative" }}
    >
      <SEO
        title="Thank you for joining the NHLBI BioData Catalyst Community"
        description="Thank you for joining the NHLBI BioData Catalyst Community"
        keywords=""
      />
      <Title>Thank you for joining the NHLBI BioData Catalyst Community</Title>
      <Paragraph>
        We are happy to have you in our community! You can start getting to know
        the Ecosystem through the methods listed below.
      </Paragraph>
      <br></br>
      <section>
        <Heading>DISCOVER THE ECOSYSTEM ELEMENTS</Heading>
        <Paragraph>
          Ready to deep dive into what the ecosystem has to offer?
        </Paragraph>
        <BulletedList dense>
          <ListItem
            primary={
              <span>
                <Link to="https://staging.biodatacatalyst.nhlbi.nih.gov/resources/services">
                  What do you want to do today?
                </Link>
              </span>
            }
          />
          <ListItem primary={<span>GUIDE</span>} />
          <ListItem primary={<span>Getting Started Checklist</span>} />
        </BulletedList>

        <Heading>STILL NOT SURE?</Heading>
        <Paragraph>
          We strive to support each other in our research endeavors. Reach out
          to the community or to the BioData Catalyst Coordinating Center to ask
          your question.
        </Paragraph>
        <BulletedList dense>
          <ListItem
            primary={
              <span>
                <ExternalLink to="https://bdcatalyst.freshdesk.com/support/discussions/60000024585">
                  Community Forums
                </ExternalLink>
              </span>
            }
          />
          <ListItem
            primary={
              <span>
                <Link to="https://biodatacatalyst.nhlbi.nih.gov/contact/">
                  BioData Catalyst Help Desk
                </Link>
              </span>
            }
          />
          <ListItem primary={<span>Event calendar</span>} />
          <ListItem primary={<span>Cloud Credits</span>} />
        </BulletedList>

        <Paragraph center>
          <Paragraph>
            ALREADY KNOW WHICH ECOSYSTEM ELEMENT YOU WANT TO USE?
          </Paragraph>
          <ButtonLink
            light
            target="_blank"
            rel="noopener noreferrer"
            to="https://gen3.biodatacatalyst.nhlbi.nih.gov/"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            GEN3
          </ButtonLink>
          <ButtonLink
            light
            target="_blank"
            rel="noopener noreferrer"
            to="https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            PIC-SURE
          </ButtonLink>
          <ButtonLink
            light
            target="_blank"
            rel="noopener noreferrer"
            to="https://terra.biodatacatalyst.nhlbi.nih.gov/"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            TERRA
          </ButtonLink>
          <Button
            light
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/auth/login?next=https%3A%2F%2Faccounts.sb.biodatacatalyst.nhlbi.nih.gov%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D74735b722c33498cb981b6b6e24f659f%26redirect_uri%3Dhttps%253A%252F%252Fplatform.sb.biodatacatalyst.nhlbi.nih.gov%252Foauth2%252Fredirect%26state%3DI0yJTlok0yClQhiGCycDKJFPpxYCje%26scope%3Dopenid%26nonce%3D16359656934167200991623799348"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            SEVEN BRIDGES
          </Button>
        </Paragraph>
      </section>
      <br />
    </PageContent>
  );
};

export default SuccessPage;
