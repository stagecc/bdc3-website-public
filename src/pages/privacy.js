import React from "react";
import { PageContent } from "../components/layout";
import { Seo } from "../components/seo";
import {
  Title,
  Heading,
  Subheading,
  Paragraph
} from "../components/typography";
import { Link } from "../components/link";
import { BulletedList, ListItem } from "../components/list";

const PrivacyPage = () => {
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <Seo title="Privacy Policy" description="" keywords="" />

      <Title>Privacy Policy</Title>

      <Paragraph>
        The{" "}
        <Link to="https://www.nhlbi.nih.gov/">
          National Heart Lung and Blood Institute
        </Link>{" "}
        (NHLBI) operates the BioData Catalyst website . Protecting your privacy
        is very important to us. The following information establishes how the
        BioData Catalyst website will use information gathered from your visit.
      </Paragraph>

      <section>
        <Heading>Information Collected and Stored Automatically</Heading>
        <Paragraph>
          If you do nothing during your visit but browse through the website,
          read pages, or download information, we will gather and store certain
          information about your visit automatically. This information does not
          identify you personally. We automatically collect and store only the
          following information about your visit:
        </Paragraph>

        <BulletedList>
          <ListItem primary="Your computer's Internet Protocol (IP) address. (An IP address is a number that is automatically assigned to your computer whenever you go on the Web." />
          <ListItem primary="The domain from which you access the Internet (for example, aol.com, if you are connecting from an America Online account, or WFU.edu if you are connecting from Wake Forest University's domain)" />
          <ListItem primary="The Internet address of the website, if any, from which you came to our site (for example, www.nih.gov if you come to our website by clicking on an NHLBI link on the National Institutes of Health website)" />
          <ListItem primary="The date and time you arrived at our site and how long you spent visiting the site" />
          <ListItem primary="The name and version of your computer's operating system and browser: for example, Windows 95/Netscape Navigator 4.5. (This information is supplied automatically by your computer." />
          <ListItem primary="The pages you visit" />
        </BulletedList>

        <Paragraph>
          We use this information to help us make the site more useful to
          visitors &mdash; to learn about the number of visitors to our site and
          the types of technology our visitors use. Unless it is specifically
          stated otherwise, no additional information will be collected about
          you.
        </Paragraph>
      </section>

      <section>
        <Heading>Registration</Heading>
        <Paragraph>
          Before you can use certain features on this website, you must
          register. Personal information such as name, address, email and
          institution are collected during the registration process and are used
          to confirm access to advanced features, such as access to controlled
          access data. Once approved, this information will be used to contact
          you in response to requests you have specifically made on this Web
          site. Your personal information may be used to audit your activity on
          the system in order to ensure compliance with NIH policies. We will
          safeguard the information you provide to us in accordance with the
          Privacy Act of 1974, as amended (5 U.S.C. Section 552a). A Privacy Act
          Notification Statement is displayed on the form page.
        </Paragraph>
      </section>

      <section>
        <Heading>Cookies</Heading>

        <Paragraph>
          The Office of Management and Budget Memo{" "}
          <Link to="https://www.nih.gov/sites/default/files/misc/m10-22.pdf">
            M-10-22, Guidance for Online Use of Web Measurement and
            Customization Technologies
          </Link>{" "}
          allows Federal agencies to use session and persistent cookies.
        </Paragraph>

        <Paragraph>
          When you visit any Web site, its server may generate a piece of text
          known as a "cookie" to place on your computer. The cookie allows the
          server to "remember" specific information about your visit while you
          are connected.
        </Paragraph>

        <Paragraph>
          The cookie makes it easier for you to use the dynamic features of Web
          pages. Cookies only collect information about your browser's visit to
          the site; they do not collect personal information about you.
        </Paragraph>

        <Paragraph>
          There are two types of cookies, single session (temporary), and
          multi-session (persistent). Session cookies last only as long as your
          Web browser is open. Once you close your browser, the cookie
          disappears. Persistent cookies are stored on your computer for longer
          periods. The BioData Catalyst website does not use persistent cookies.
        </Paragraph>

        <Subheading>Session Cookies</Subheading>

        <Paragraph>
          We use session cookies for technical purposes such as to enable better
          navigation through our site. These cookies let our server know that
          you are continuing a visit to our site. The OMB Memo 10-22 Guidance
          defines our use of session cookies as "Usage Tier 1 — Single Session."
          The policy says, "This tier encompasses any use of single session web
          measurement and customization technologies."
        </Paragraph>

        <Paragraph>
          If you do not wish to have session or persistent cookies placed on
          your computer, you can disable them using your Web browser. If you opt
          out of cookies, you will still have access to all information and
          resources at this site. Instructions for disabling or opting out of
          cookies in the most popular browsers are located at 
          <Link to="https://www.usa.gov/optout-instructions">
            https://www.usa.gov/optout-instructions.
          </Link>
          Please note that by following the instructions to opt-out of cookies,
          you will disable cookies from all sources, not just those from this
          site.
        </Paragraph>
      </section>

      <section>
        <Heading>Links to Other Websites</Heading>

        <Paragraph>
          BioData Catalyst has links to many other websites, including some
          sites which are maintained by non-governmental organizations or
          private companies. BioData Catalyst is not responsible for the
          contents of any "off-site" webpage referenced from this server.
          Specifically:
        </Paragraph>

        <BulletedList>
          <ListItem
            primary="
                        BioData Catalyst cannot guarantee the privacy or security of information you provide to these other websites.
                        You should review their privacy policies if you have concerns.
                    "
          />

          <ListItem
            primary="
                        Reference in this website to any specific commercial products, process, service, manufacturer,
                        or company does not constitute endorsement or recommendation by the US Government or BioData Catalyst.
                    "
          />
        </BulletedList>
      </section>

      <section>
        <Heading>If You Send Us E-mail</Heading>
        <Paragraph>
          By sending us an e-mail message, you may be sending personal
          information (e.g., your name, address, and e-mail address). We will
          store this information in order to respond to your request or
          otherwise resolve the subject matter of your e-mail. Please note,
          however, that e-mail messages are sent over the Internet as free text
          and are not secure from interception by unauthorized third parties.
        </Paragraph>
      </section>

      <section>
        <Heading>If You Send Us Any Other Information</Heading>

        <Paragraph>
          The site includes fill-in forms that may require personal information
          in order to receive information, software, or data. Such information
          will not be shared with third parties unless specified on the fill-in
          form or required by law. A Privacy Act Notification Statement is
          displayed on the form page.
        </Paragraph>

        <Paragraph>
          Like e-mail, form contents are sent over the Internet as free text and
          are not secure from interception by unauthorized third parties.
        </Paragraph>

        <Paragraph>
          If you have questions about BioData Catalyst's privacy policy, please
          e-mail them to{" "}
          <a href="mailto:biodatacatalyst@nhlbi.nih.gov">
            biodatacatalyst@nhlbi.nih.gov
          </a>
          .
        </Paragraph>
      </section>
    </PageContent>
  );
};

export default PrivacyPage;
