import React from "react";
import { Link } from "../components/link";
import { PageContent } from "../components/layout";
import { Title, Paragraph } from "../components/typography";
import { SEO } from "../components/seo";

const AccessibilityPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Accessibility" description="" keywords="" />

    <Title>Accessibility</Title>

    <Paragraph>
      We are committed to making BDC accessible to all users,
      regardless of special need. We are committed to designing our sites to be
      compatible with screen readers and other assistive devices. However, this
      is an ongoing process and it is possible that some users may encounter
      problems accessing some pages.
    </Paragraph>

    <Paragraph>
      For questions about our continuing efforts to make the information on the
      BDC ecosystem accessible to all users, or to report an
      accessibility problem on any of our pages, please complete the form on our{" "}
      <Link to="/contact">Contact page</Link>. If you have difficulty using the
      form, you may also send an e-mail to{" "}
      <a href="mailto:biodatacatalyst@nhlbi.nih.gov">
        biodatacatalyst@nhlbi.nih.gov
      </a>
      .
    </Paragraph>
  </PageContent>
);

export default AccessibilityPage;
