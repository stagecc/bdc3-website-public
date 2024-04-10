import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { Link} from "../../components/link";

const ByodPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Bring Your Own Data" description="" keywords="" />

    <Title>Bring Your Own Data</Title>

    <Paragraph>
      To support flexibility and analysis, we allow researchers to bring their own data and workflows into the ecosystem.
      Researchers can bring their own datasets into <em>BDC Powered by Seven Bridges (BDC-Seven Bridges)</em> and <em>BDC 
      Powered by Terra (BDC-Terra)</em>.
    </Paragraph>

    <br />

    <section>
      <Heading>Build on Your Existing Work</Heading>

      <Paragraph>
        As described in the BDC Data Use Policy, users can upload
        data for which they have the appropriate approval, provided that they do
        not violate the terms of their Data Use Agreements, Limitations, or
        Institutional Review Board policies and guidelines.
      </Paragraph>

      <br />

      <Paragraph center>
        <Link to="https://sb-biodatacatalyst.readme.io/docs/upload-to-the-platform">
          BYOD to <em>BDC-Seven Bridges</em>
        </Link>

        <br />
        <br />

        <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/terra/bringing-data-into-a-workspace/using-your-own-data-with-terra">
          BYOD to <em>BDC-Terra</em>
        </Link>
      </Paragraph>
    </section>

    <br />

    <section>
      <Heading>Data Use Policy Statement</Heading>

      <Paragraph>
        BDC adheres to internationally recognized policies for data access and 
        release that have been developed to enable broad access to data on the 
        BDC ecosystem. Data available on the BDC ecosystem are subject to both 
        general and data-set specific data use policies, and access to controlled 
        data are restricted to authorized users. As a BDC user, you are solely 
        responsible for adhering to Data Use Agreement(s), Institutional Review 
        Board policies and guidelines, and other Data Use Limitations when 
        uploading or downloading data on the BDC ecosystem.
      </Paragraph>
    </section>
  </PageContent>
);

export default ByodPage;
