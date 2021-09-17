import React from "react";
import { PageContent } from "../components/layout";
import { SEO } from "../components/seo";
import { Title, Heading, Paragraph } from "../components/typography";
import { Link } from "../components/link";

const DataProtectionPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Data Protection" description="" keywords="" />

    <Title>Data Protection</Title>

    <Paragraph>
      In addition to its useful tools, applications, and workflows, NHLBI
      BioData Catalyst increases access to NHLBI datasets, allows researchers to
      bring their own data, and offers secure collaboration workspaces. BioData
      Catalyst, therefore, must responsibly steward access to hosted datasets,
      require researchers bringing their own data to respect and protect the
      interests of research participants, and take measures to secure the
      BioData Catalyst ecosystem.
    </Paragraph>

    <section>
      <Heading>All Users and All Data</Heading>
      <Paragraph>
        Whether working with hosted or their own data, users are always
        obligated to protect participant privacy and must follow{" "}
        <Link to="https://osp.od.nih.gov/scientific-sharing/genomic-data-sharing/">
          NIH policies for data protection
        </Link>
        . User institutions are accountable and may be subject to sanctions if
        policies are violated.
      </Paragraph>

      <Heading>Hosted Data Access Controls</Heading>
      <Paragraph>
        All hosted data within BioData Catalyst is de-identified. Further
        restrictions on access and use are used as additional measures of
        security.
      </Paragraph>
    </section>

    <section>
      <Heading>Authorization of Use</Heading>
      <Paragraph>
        Access to hosted data is controlled through the{" "}
        <Link to="https://dbgap.ncbi.nlm.nih.gov">
          Database of Genotypes and Phenotypes
        </Link>{" "}
        (dbGaP) system by authorization of the appropriate Data Access Committee
        (DAC). Data Access Committees are established based on programmatic
        areas of interest as well as technical and ethical expertise. All DACs
        operate through common principles and under similar mechanisms to ensure
        the consistency and transparency of the controlled-data access process.
        Use of industry standard{" "}
        <Link to="https://oauth.net/">OAuth 2.0</Link> and{" "}
        <Link to="https://openid.net/connect/">
          Open ID Connect
        </Link>{" "}
        (OIDC) services, which are connected to{" "}
        <Link to="https://era.nih.gov/">
          NIH’s electronic Research Administration
        </Link>{" "}
        (eRA) infrastructure for authentication and authorization, ensures that
        only data objects approved for access by NIH DACs and approved in dbGaP
        are available to a user in BioData Catalyst.
      </Paragraph>
    </section>

    <section>
      <Heading>
        Access to Individual Level Data and Download Functionality
      </Heading>
      <Paragraph>
        All data transfers are made using standard Transport Layer Security
        (TLS) encrypted sessions. And users must be logged in with their eRA
        accounts to access individual level data or download any data (see below
        for details about downloading data).
      </Paragraph>
    </section>

    <section>
      <Heading>Data Download Restrictions</Heading>
      <Paragraph>
        Download capabilities are limited to metadata and analysis results, and
        the latter must comply with restrictions defined by NIH for{" "}
        <Link to="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-19-023.html">
          Summary Results
        </Link>
        . Downloading of sequences, variants, images, phenotypes and other
        individual data is prohibited. BioData Catalyst notifies and repeatedly
        reminds users that they may not download individual level data when they
        receive cloud credits, when they login, and when they request downloads.
        Monitoring of data egress adds another layer of security.
      </Paragraph>
    </section>
  </PageContent>
);

export default DataProtectionPage;
