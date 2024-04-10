import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title, Heading, Paragraph } from "../../components/typography";
import { Link } from "../../components/link";
import { CloudCreditsForm } from "../../components/form";
import { BulletedList, ListItem } from "../../components/list";

const CloudCreditsPage = () => (
  <PageContent width="95%" maxWidth="1200px" center gutters>
    <SEO title="Cloud Costs and Credits" description="" keywords="" />
    <Title>Cloud Costs and Credits</Title>

    <section>
      <Heading>Cloud Costs on BDC</Heading>

      <Paragraph>
        BDC hosts a number of datasets available for analysis to
        users with appropriate data access approvals. Users are not charged for
        the storage of these hosted datasets; however, if hosted data is used in
        analyses users incur costs for computation and storage of derived
        results.
      </Paragraph>

      <Paragraph>
        Users of BDC workspace environments <em>Powered by Seven Bridges 
        (BDC-Seven Bridges)</em> and <em>Powered by Terra (BDC-Terra)</em> can 
        incur both computation and storage cloud costs. Computation costs are 
        influenced by compute instance size, the duration for which the instance 
        is used, and the cloud providers' pricing of the compute instance at the 
        time of execution. Storage costs are influenced by file size, the duration 
        the file is stored, and the cloud providers' pricing of the storage class. 
        Users can delete result files once they are no longer needed to avoid 
        unnecessary storage costs. BDC users who upload/import their own data to 
        the system incur storage costs for these uploaded files as well.
      </Paragraph>
    </section>

    <section>
      <Heading>Choosing a Workspace</Heading>

      <Paragraph>
        Users of BDC workspaces can apply for cloud credits to
        support cloud costs as described in the sections below.{" "}
        <b>
          Prior to applying for cloud credits, users must set up an account on
          at least one of the workspace environments,{" "}
          <em>BDC-Seven Bridges</em> or <em>BDC-Terra</em>.
        </b>{" "}
        Users are welcome to create accounts on both of the workspace
        environments. To learn more about what each workspace has to offer,
        follow the links below:
      </Paragraph>

      <BulletedList>
        <ListItem
          primary={
            <Link to="https://biodatacatalyst.nhlbi.nih.gov/platforms/terra">
              <em>BDC-Terra</em>
            </Link>
          }
        />
        <ListItem
          primary={
            <Link to="https://biodatacatalyst.nhlbi.nih.gov/platforms/seven-bridges">
              <em>BDC-Seven Bridges</em>
            </Link>
          }
        />
      </BulletedList>
    </section>

    <section>
      <Heading>Pilot Funding</Heading>

      <Paragraph>
        New users of BDC who are affiliated with non-commercial 
        entities may apply for an initial $500 in cloud credits, also known as 
        Pilot Credits, and many analyses can be completed for that amount or 
        less. Others, including NIH intramural researchers, may use the $500 
        in cloud credits to test and evaluate BDC for their 
        research needs, for example piloting pipelines on smaller samples and 
        estimating how much full analysis will cost.
      </Paragraph>

      <Paragraph>
        Pilot Credits may be applied to one workspace environment - <em>BDC-Seven 
        Bridges</em> or <em>BDC-Terra</em> - or divided between both.
      </Paragraph>

      <Paragraph>
        Please fill out the form below to request your $500 in initial pilot
        cloud credits.
      </Paragraph>
    </section>

    <section>
      <Heading>Cloud Costs After or Without Pilot Funding</Heading>

      <Paragraph>
        Users support their own cloud costs once they exceed their pilot 
        funding. Users of <em>BDC-Seven Bridges</em> can cover 
        additional costs by providing a credit card or purchase order number. 
        Users of <em>BDC-Terra</em> can cover costs using their 
        own Google accounts.  To support your own cloud costs on Seven Bridges, 
        please contact support@sevenbridges.com. To support your own cloud costs 
        on Terra, please contact support@terra.bio.
      </Paragraph>

      <Paragraph>
        <a href="#understanding">Use these resources</a> to understand and
        estimate cloud costs, and consider including the expenses in your
        funding applications.
      </Paragraph>

      {/* <Paragraph>
        If the anticipated costs are in excess of $500, users on BioData
        Catalyst Powered by Terra can cover costs using their own Google
        accounts. Users of BioData Catalyst Powered by Seven Bridges can cover
        additional costs by providing a credit card or purchase order number.
        Alternatively, users can apply for additional credits via the NHLBI
        BioData Catalyst Cloud Credit Program (
        <AnchorLink to="/resources/cloud-credits#cloud-credits-form">
          see form below
        </AnchorLink>
        ).
      </Paragraph> */}

      <Paragraph>
        Users with projects in the heart, lung, blood, and sleep fields who are
        unable to secure other funding may apply for additional credits to
        support specific research studies via the NHLBI BioData Catalyst Cloud
        Credit Program (see immediately below).
      </Paragraph>
    </section>

    <section>
      <Heading>BDC Cloud Credit Program</Heading>

      <Paragraph>
        The BDC Cloud Credit Program offers users affiliated with 
        non-commercial entities the opportunity to apply for additional cloud 
        credits to support research projects in the heart, lung, blood, and 
        sleep fields. Cloud credits are awarded on a per project basis, so if 
        multiple users are working together on a larger project the group should 
        submit one application. All individuals involved in a project will be 
        able to make use of awarded cloud credits through a shared billing group 
        on either <em>BDC-Seven Bridges</em> or <em>BDC-Terra</em>.
      </Paragraph>

      <Paragraph>
        Cloud credits recipients agree to acknowledge the funding for BDC in all 
        publications and external presentations, as noted in the How to Cite Us 
        section on this page.
      </Paragraph>

      <Paragraph>
        Users can submit an application using the Cloud Credit Request Form
        below. Cloud Credit Program requests will be reviewed and decided as
        soon as possible. The credits will remain active as long as there is
        activity in the billing group. If there is 6 months of inactivity then
        users will be queried if the credits are still needed.
      </Paragraph>
    </section>

    <section>
      <Heading id="understanding">
        Understanding and Estimating Cloud Costs
      </Heading>

      <Paragraph>
        Links to resources that provide helpful information about cloud costs
        can be found below with additional guidance forthcoming.
      </Paragraph>

      <BulletedList>
        <ListItem
          primary={
            <span>
              <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/terra/account-setup/managing-costs">
                Controlling your cloud costs
              </Link>{" "}
              (<em>BDC-Terra</em>)
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              <Link to="https://sb-biodatacatalyst.readme.io/docs/about-pricing">
                Cloud infrastructure pricing
              </Link>{" "}
              (<em>BDC-Seven Bridges</em>)
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              <Link to="https://sb-biodatacatalyst.readme.io/page/comprehensive-tips-for-reliable-and-efficient-analysis-set-up">
                Comprehensive tips for reliable and efficient analysis set-up
              </Link>{" "}
              (<em>BDC-Seven Bridges</em>)
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              <Link to="https://sb-biodatacatalyst.readme.io/docs/estimate-and-manage-your-cloud-costs">
                Estimate and Manage Your Cloud Costs
              </Link>{" "}
              (<em>BDC-Seven Bridges</em>)
            </span>
          }
        />
      </BulletedList>

      <Paragraph>
        If you need additional assistance with understanding cloud costs, please
        reach out to the <Link to="/contact">help desk</Link> with your
        question(s) and choose the type "Cloud Credits."
      </Paragraph>
    </section>

    <br />

    <section>
      <CloudCreditsForm id="cloud-credits-form" />
    </section>
  </PageContent>
);

export default CloudCreditsPage;
