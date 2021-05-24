import React from 'react'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { ExternalLink } from '../components/link'
const ContactPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Contact"
            description=""
            keywords=""
        />

        <Title>Contact</Title>

        <Paragraph>
            Use the form below to let us know your questions or concerns.
            Do you need help with where to direct your question?
            Please see the <ExternalLink to="https://bdcatalyst.freshdesk.com/support/solutions/articles/60000666868-where-do-i-direct-my-question-regarding-biodata-catalyst-and-the-help-desk-">help desk directory</ExternalLink> to understand the best option for directing your request.
        </Paragraph>

        <Paragraph center>
            <strong>
                In order to protect your privacy and the privacy of study participants,
                you MUST NOT include any personally identifiable information or personal health information in a helpdesk request.
                If access to such information is needed in order to resolve your request, you may send that information securely,
                through external means such as US mail.
            </strong>
        </Paragraph>

        <iframe
            title="Feedback Form"
            className="freshwidget-embedded-form"
            id="freshwidget-embedded-form"
            src="https://bdcatalyst.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&screenshot=No&captcha=yes"
            scrolling="no"
            height="650px"
            width="100%"
            frameBorder="0"
        ></iframe>

    </PageContent>
)

export default ContactPage
