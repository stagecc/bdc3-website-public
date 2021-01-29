import React from 'react'
import { SEO } from '../../components/seo'
import { Link } from 'gatsby'
import { PageContent } from '../../components/layout'
import { Title, Heading, Paragraph } from '../../components/typography'
import { ExternalLink } from '../../components/link'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { CloudCreditsForm } from '../../components/form'
import { BulletedList, ListItem } from '../../components/list'

const CloudCreditsPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Cloud Credits"
            description=""
            keywords=""
        />

        <Title>Cloud Credits</Title>

        <section>
            <Heading>Cloud Costs on BioData Catalyst</Heading>

            <Paragraph>
                BioData Catalyst hosts a number of datasets available for analysis to users with appropriate data access approvals.
                Users are not charged for the storage of these hosted datasets;
                however, if hosted data is used in analyses users incur costs for computation and storage of derived results.
            </Paragraph>

            <Paragraph>
                Users of BioData Catalyst workspace environments Powered by Seven Bridges and Powered by Terra can incur both computation and storage cloud costs.
                Computation costs are influenced by compute instance size, the duration for which the instance is used, and the cloud providers' pricing of the compute instance at the time of execution.
                Storage costs are influenced by file size, the duration the file is stored, and the cloud providers' pricing of the storage class.
                Users can delete result files once they are no longer needed to avoid unnecessary storage costs.
                BioData Catalyst users who upload/import their own data to the system incur storage costs for these uploaded files as well.
            </Paragraph>
        </section>

        <section>
            <Heading>Choosing a Workspace</Heading>

            <Paragraph>
                Users of BioData Catalyst workspaces will need to choose either
                the <em>Powered by Seven Bridges</em> or <em>Powered by Terra</em> workspace environments
                to apply for Pilot Funding cloud credits and/or request additional cloud credits.
                To learn more about what each workspace has to offer, follow the links below:
            </Paragraph>

            <BulletedList>
                <ListItem primary={ <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/platforms/terra">BioData Catalyst Powered by Terra</ExternalLink>} />
                <ListItem primary={ <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/platforms/seven-bridges">BioData Catalyst Powered by Seven Bridges</ExternalLink>} />
            </BulletedList>

        </section>

        <section>
            <Heading>Pilot Funding</Heading>

            <Paragraph>
                New users of BioData Catalyst may apply for an initial $500 in cloud credits, and many analyses can be completed for that amount or less.
                Others may use the $500 in cloud credits to test and evaluate BioData Catalyst for their research needs,
                for example piloting pipelines on smaller samples and estimating how much full analysis will cost. 
            </Paragraph>

            <Paragraph>
                If the anticipated costs are in excess of $500, users on BioData Catalyst Powered by Terra can cover costs using their own Google accounts.
                Users of BioData Catalyst Powered by Seven Bridges can cover additional costs by providing a credit card or purchase order number.
                Alternatively, users can apply for additional credits via the NHLBI BioData Catalyst Cloud Credit Program
                (<AnchorLink to="/resources/cloud-credits#cloud-credits-form">see form below</AnchorLink>).
            </Paragraph>
        </section>

        <section>
            <Heading>NHLBI BioData Catalyst Cloud Credit Program</Heading>

            <Paragraph>
                The NHLBI BioData Catalyst Cloud Credit Program offers users the opportunity to apply for additional cloud credits to support research projects in the heart, lung, blood, and sleep fields.
                Cloud credits are awarded on a per project basis, so if multiple users are working together on a larger project the group should submit one application.
                All individuals involved in a project will be able to make use of awarded cloud credits through a shared billing group on either
                BioData Catalyst Powered by Seven Bridges or BioData Catalyst Powered by Terra.
                Users can submit an application using the <AnchorLink to="/resources/cloud-credits#cloud-credits-form">Cloud Credit Request Form</AnchorLink> below.
            </Paragraph>

            <Paragraph>
                Requests for additional cloud credits will be reviewed and decided as soon as possible.
            </Paragraph>
        </section>

        <section>
            <Heading>Understanding Cloud Costs</Heading>

            <Paragraph>
                Links to resources that provide helpful information about cloud costs can be found below with additional guidance forthcoming.
            </Paragraph>
            
            <BulletedList>
                <ListItem primary={ <span><ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/analyze-data/terra/controlling-cloud-costs">Controlling your cloud costs</ExternalLink> (BioData Catalyst powered by Terra)</span> } />
                <ListItem primary={ <span><ExternalLink to="https://sb-biodatacatalyst.readme.io/docs/cloud-infrastructure-pricing">Cloud infrastructure pricing</ExternalLink> (BioData Catalyst powered by Seven Bridges)</span> } />
                <ListItem primary={ <span><ExternalLink to="https://sb-biodatacatalyst.readme.io/page/comprehensive-tips-for-reliable-and-efficient-analysis-set-up">Comprehensive tips for reliable and efficient analysis set-up</ExternalLink> (BioData Catalyst Powered by Seven Bridges)</span> } />
            </BulletedList>

            <Paragraph>
                If you need additional assistance with understanding cloud costs,
                please reach out to the <Link to="/contact">help desk</Link> with your question(s) and choose the type "Cloud Credits."
            </Paragraph>
        </section>

        <section>
            <Heading>Citing NHLBI BioData Catalyst</Heading>

            <Paragraph>
                Cloud credits recipients agree to acknowledge the funding for the NHLBI BioData Catalyst
                in all publications and external presentations, as noted in
                the <Link to="/about">How to Cite Us section on this page</Link>.
            </Paragraph>
        </section>

        <br/>
        
        <section>
            <CloudCreditsForm id="cloud-credits-form"/>
        </section>
        
    </PageContent>
)

export default CloudCreditsPage
