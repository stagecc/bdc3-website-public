import React from 'react'
import { Link } from 'gatsby'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../components/typography'

const ResourcesPage = () => (
    <PageContent width="95%" maxWidth="1080px" center gutters>
        <SEO
            title="Available Resources"
            description=""
            keywords=""
        />

        <Title>Resources</Title>
    
        <Heading>Documentation</Heading>

        <Paragraph>
            Find step by step instructions on how to use BioData Catalyst services and tools.
        </Paragraph>

        <Subheading>Teams</Subheading>

        <ul>
            <li>Gen3</li>
            <li>Terra</li>
            <li>Etc.</li>
        </ul>

        <Heading>Services & Tools</Heading>

        <Paragraph>
            Learn about the different services and tools in BioData Catalyst and what you can do with them.
        </Paragraph>

        <div>Possibly render matrix of Tools &times; Abilities</div>

        <Heading>FAQs</Heading>
        <Paragraph>
            Browse our answers to <Link to="/faq">frequently asked questions</Link> from BioData Catalyst users.
        </Paragraph>

        <Heading>Community Forums</Heading>
        <Paragraph>
            Connect with others using the BioData Catalyst and learn how they are using the system.
        </Paragraph>

        <Heading>Videos</Heading>
        <Paragraph>
            View BioData Catalyst team webinars, workshops, and how-to videos.
        </Paragraph>

        <Heading>Blog Posts & Tutorials</Heading>
        <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus cum dolorum officia minus consequuntur rem odit adipisci assumenda doloremque in repellat dicta nesciunt facere deleniti omnis, quibusdam, voluptate ullam, cumque.
        </Paragraph>
        
        <Heading>Help Desk</Heading>
        <Paragraph>
            Are you seeking help on working with BioData Catalyst? <Link to="/">Connect with our Support Team now</Link>!
        </Paragraph>

        <Heading>Follow Us</Heading>
        <Paragraph>
            Tweet at us @bcd_help or twwet with hashtag bcdhelp or something
        </Paragraph>

        <Heading>Ideas & Suggestions</Heading>
        <div>front page cta</div>
        <div>Move up in site tree</div>

        <Heading>Legal</Heading>
        <Paragraph>
            Learn more about our privacy policies, terms of use, copyright policies, data use, and financial conflicts of interest.
        </Paragraph>

    </PageContent>
)

export default ResourcesPage
