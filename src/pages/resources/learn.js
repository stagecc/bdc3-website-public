import React from 'react'
import { SEO } from '../../components/seo'
import { Link } from 'gatsby'
import { PageContent } from '../../components/layout'
import { Title, Paragraph } from '../../components/typography'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { ResourceCard } from '../../components/card'
import { BulletedList, ListItem } from '../../components/list'
import { ExternalLink } from '../../components/link'
import { BlogIcon, CommunityIcon, DocumentsIcon, EventsIcon, FaqsIcon, VideosIcon } from '../../components/icons'

const resources = [
    {
        title: 'Documentation',
        icon: <DocumentsIcon size={ 64 } fill="var(--color-crimson)" />,
        description: 'Find step-by-step instructions on how to use BioData Catalyst services and tools.',
        links: [
            {
                text: 'SevenBridges Documentation',
                url: 'https://f4c.readme.io/docs'
            },
            {
                text: 'Terra Documentation',
                url: 'https://support.terra.bio/hc/en-us/categories/360001399872'
            },
            {
                text: 'Terra Quickstart',
                url: 'https://support.terra.bio/hc/en-us/categories/360002177552'
            },
            {
                text: 'Gen3 Documentation',
                url: 'https://gen3.org/get-started/'
            },
            {
                text: 'Dockstore Documentation',
                url: 'https://docs.dockstore.org/en/develop/'
            },
        ]
    },
    {
        title: 'Videos',
        icon: <VideosIcon size={ 64 } fill="var(--color-crimson)" />,
        description: 'BioData Catalyst webinars, workshops, and how to videos.',
        links: [
            {
                text: 'Gen3 Videos',
                url: 'https://forums.gen3.org',
            },
            {
                text: 'Dockstore Videos',
                url: 'https://www.youtube.com/watch?v=-JuKsSQja3g',
            },
            {
                text: 'Terra Workshop Videos',
                url: 'https://support.terra.bio/hc/en-us/articles/360028444332-Terra-workshop-at-BroadE-May-22-2019',
            },
        ]
    },
    {
        title: 'FAQs',
        icon: <FaqsIcon size={ 64 } fill="var(--color-crimson)" />,
        description: 'Find answers to frequently asked questions from BioData Catalyst users',
        links: [
            {
                text: 'Gen3 FAQs',
                url: 'https://gen3.org/resources/faq/',
            },
            {
                text: 'Terra (Free Credits) FAQs',
                url: 'https://support.terra.bio/hc/en-us/articles/360027940952-Free-credits-FAQs',
            },
            {
                text: 'Dockstore FAQs',
                url: 'https://docs.dockstore.org/en/develop/faq.html',
            },
        ]
    },
    {
        title: 'Community Forums',
        icon: <CommunityIcon size={ 64 } fill="var(--color-crimson)" />,
        description: 'Connect with others using the BioData Catalyst and learn how they are using it.',
        links: [
            {
                text: 'Terra Forum',
                url: 'https://support.terra.bio/hc/en-us/community/topics',
            },
            {
                text: 'Dockstore Forum',
                url: 'https://gitter.im/ga4gh/dockstore',
            },
            {
                text: 'Gen3 Forum',
                url: 'https://forums.gen3.org/',
            },
        ]
    },
    {
        title: 'Blogs & Tutorials',
        icon: <BlogIcon size={ 64 } fill="var(--color-crimson)" />,
        description: 'Learn about how the BioData Catalyst is evolving and how to use the system from the community.',
        links: [
            {
                text: 'Terra Tutorials',
                url: 'https://datastage.terra.bio/#library/showcase',
            },
            {
                text: 'Terra Blog',
                url: 'https://support.terra.bio/hc/en-us/sections/360005942552',
            },
            {
                text: 'Terra Release Notes & Service Notifications',
                url: 'https://support.terra.bio/hc/en-us/categories/360000693572',
            },
            {
                text: 'SevenBridges Blog (Releases)',
                url: 'https://f4c.readme.io/blog',
            },
        ]
    },
    {
        title: 'Upcoming Events',
        icon: <EventsIcon size={ 64 } fill="var(--color-crimson)" />,
        description: 'Find upcoming BioData Catalyst events or view the archive.',
        links: [
            {
                text: 'Dockstore News & Events',
                url: 'https://docs.dockstore.org/en/develop/news.html',
            },
            {
                text: 'Gen3 Announcements',
                url: 'https://forums.gen3.org/c/announcements/6',
            },
            {
                text: 'Gen3 Webinars',
                url: 'https://gen3.org/community/webinars/',
            },
            {
                text: 'Terra Community Events',
                url: 'https://support.terra.bio/hc/en-us/categories/360001430891',
            },
        ]
    },
]

const LearnPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Learn and Support"
            description=""
            keywords=""
        />

        <Title>Learn and Support</Title>

        <Paragraph>
            The NHLBI BioData Catalyst is an ecosystem made up of many platforms and partners that support our researchers.
        </Paragraph>

        <Paragraph>
            Get started on the BioData Catalyst ecosystem with this collection of documentation, videos, FAQs, community forums, tutorials, blog posts, upcoming events, and more from our ecosystem partners. 
        </Paragraph>

        <Paragraph>
            For more immediate assistance, contact our <Link to="/contact">help desk</Link>.
        </Paragraph>

        <Grid fluid>
            <Row>
                {
                    resources.map(resource => (
                        <Col key={ resource.title } xs={ 12 } md={ 6 } xl={ 4 } style={{ margin: '3rem 0' }}>
                            <ResourceCard title={ resource.title } icon={ resource.icon || 'ICON' }>
                                <Paragraph>{ resource.description }</Paragraph>
                                <BulletedList dense>
                                    {
                                        resource.links.map(link => (
                                            <ListItem key={ link.text } primary={ <ExternalLink to={ link.url }>{ link.text }</ExternalLink> } />
                                        ))
                                    }
                                </BulletedList>
                            </ResourceCard>
                        </Col>
                    ))
                }
            </Row>
        </Grid>

    </PageContent>
)

export default LearnPage
