import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import {
  Title,
  Heading,
  Paragraph,
} from "../../components/typography";
import { BulletedList, ListItem } from "../../components/list";
import { Link } from "../../components/link";

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
        We are happy to welcome you to our community! The following resources
        will help you become familiar with and get started using the NHLBI
        BioData Catalyst ecosystem. <br></br>
        <br></br>
        You will also receive an email from us with these resources and a link
        to create your password for the community help desk and forums.
      </Paragraph>
      <br></br>
      <section>
        <Heading>DISCOVER BIODATA CATALYST</Heading>

        <BulletedList dense>
          <ListItem
            primary={
              <span>
                <Paragraph>
                  Use our BioData Catalyst User&nbsp;
                  <Link
                    target="_blank"
                    to="https://drive.google.com/file/d/19S_iGRHxg8JmupHawhz8e9qR3hF8ht3H/view"
                  >
                    GUIDE
                  </Link>
                  &nbsp;to become familiar with BioData Catalyst’s platforms and
                  services, how they interconnect, and which may be most helpful
                  to your research. For example, the GUIDE may help you choose
                  which workspace you want to start your analysis in.
                </Paragraph>
              </span>
            }
          />
        </BulletedList>

        <Heading>LEARN ABOUT THE HOSTED DATA</Heading>
        <BulletedList dense>
          <ListItem
            primary={
              <span>
                <Paragraph>
                  Explore our rich phenotypic data resources with&nbsp;
                  <Link
                    target="_blank"
                    to="https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login"
                  >
                    Open PIC-SURE&nbsp;
                  </Link>
                  (view documentation
                  <Link
                    target="_blank"
                    to="https://docs.google.com/document/d/1oVmdBSETxHNpB2DIWAh05TH_uUMPeJQKgyFsAGXpQVU/edit#heading=h.nohmcs2v8hsa"
                  >
                    here
                  </Link>
                  ). You will need an{" "}
                  <Link
                    target="_blank"
                    to="https://era.nih.gov/register-accounts/understanding-era-commons-accounts.htm"
                  >
                    eRA Commons ID
                  </Link>{" "}
                  to access Open PIC-SURE, but&nbsp;
                  <Link
                    target="_blank"
                    to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login"
                  >
                    you do not need dbGaP permissions
                  </Link>
                  &nbsp;to explore the available data. Use Open PIC-SURE to
                  discover what data you would like to use, and then request
                  dbGaP access.
                </Paragraph>
              </span>
            }
          />
          <ListItem
            primary={
              <span>
                <Paragraph>
                  <Link
                    target="_blank"
                    to="https://biodatacatalyst.nhlbi.nih.gov/resources/data/"
                  >
                    Visit the Data page
                  </Link>{" "}
                  &nbsp;on our website for a brief overview of the data
                  available in the BioData Catalyst Ecosystem and how to access
                  it.
                </Paragraph>
              </span>
            }
          />
        </BulletedList>

        <Heading>GET CLOUD CREDITS AND RUN AN ANALYSIS</Heading>
        <BulletedList dense>
          <ListItem
            primary={
              <span>
                <Paragraph>
                  <Link
                    target="_blank"
                    to="https://biodatacatalyst.nhlbi.nih.gov/resources/cloud-credits"
                  >
                    Apply for Pilot Funding cloud credits
                  </Link>
                  &nbsp;to test and evaluate the analysis workspace(s) with your
                  chosen data. Note that it can take a few business days for
                  cloud credit requests to be approved and applied to the
                  workspace(s) you choose.
                </Paragraph>
              </span>
            }
          />
          <ListItem
            primary={
              <span>
                <Paragraph>
                  Using the GUIDE above, pick a workspace environment to try out
                  (
                  <Link
                    target="_blank"
                    to="https://terra.biodatacatalyst.nhlbi.nih.gov/#workspaces"
                  >
                    BioData Catalyst Powered by Terra
                  </Link>{" "}
                  and/or{" "}
                  <Link
                    target="_blank"
                    to="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/auth/login?next=https%3A%2F%2Faccounts.sb.biodatacatalyst.nhlbi.nih.gov%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D74735b722c33498cb981b6b6e24f659f%26redirect_uri%3Dhttps%253A%252F%252Fplatform.sb.biodatacatalyst.nhlbi.nih.gov%252Foauth2%252Fredirect%26state%3DYYGRQegjWMkiv8aBqE4gA9tl0pMgSc%26scope%3Dopenid%26nonce%3D56551633294225677721625106839"
                  >
                    BioData Catalyst Powered by Seven Bridges
                  </Link>
                  ). You are welcome to work in one or both of the workspace
                  environments.
                </Paragraph>
              </span>
            }
          />
        </BulletedList>

        <Heading>DEEP DIVE FOR MORE INFORMATION</Heading>
        <BulletedList dense>
          <ListItem
            primary={
              <span>
                <Paragraph>
                  <Link
                    target="_blank"
                    to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started"
                  >
                    Try the Getting Started Overview
                  </Link>
                  &nbsp;for step-by-step guidance on navigating the ecosystem.
                </Paragraph>
              </span>
            }
          />
          <ListItem
            primary={
              <span>
                <Paragraph>
                  <Link
                    target="_blank"
                    to="https://biodatacatalyst.nhlbi.nih.gov/resources/learn/"
                  >
                    Explore documentation
                  </Link>
                  &nbsp;for each of the ecosystem elements.
                </Paragraph>
              </span>
            }
          />
        </BulletedList>
        <Heading>STILL NOT SURE?</Heading>
        <Paragraph>
          We strive to support each other in our research endeavors. Contact the
          BioData Catalyst Coordinating Center&nbsp;
          <Link
            target="_blank"
            to="https://biodatacatalyst.nhlbi.nih.gov/contact/"
          >
            using the BioData Catalyst Help Desk
          </Link>{" "}
          &nbsp;if you would like help getting started.
        </Paragraph>

        <Paragraph center>
          <Paragraph>
            ALREADY KNOW WHICH ECOSYSTEM ELEMENT YOU WANT TO USE?
          </Paragraph>
          <Link
          asButton={true}
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
          </Link>
          <Link
          asButton={true}
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
          </Link>
          <Link
            asButton={true}
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
          </Link>
          <Link
            asButton={true}
            light
            target="_blank"
            rel="noopener noreferrer"
            to="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/auth/login?next=https%3A%2F%2Faccounts.sb.biodatacatalyst.nhlbi.nih.gov%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D74735b722c33498cb981b6b6e24f659f%26redirect_uri%3Dhttps%253A%252F%252Fplatform.sb.biodatacatalyst.nhlbi.nih.gov%252Foauth2%252Fredirect%26state%3DI0yJTlok0yClQhiGCycDKJFPpxYCje%26scope%3Dopenid%26nonce%3D16359656934167200991623799348"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            SEVEN BRIDGES
          </Link>
        </Paragraph>
      </section>
      <br />
    </PageContent>
  );
};

export default SuccessPage;
