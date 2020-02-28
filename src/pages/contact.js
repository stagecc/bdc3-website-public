import React from 'react'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'

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
        </Paragraph>

        <Paragraph center>
            <strong>** Please do not use this form to share any sensitive data. **</strong>
        </Paragraph>

        <script type="text/javascript" src="https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js"></script>
        <style type="text/css" media="screen, projection">
            @import url(https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css);
        </style>
        <iframe title="Feedback Form" class="freshwidget-embedded-form" id="freshwidget-embedded-form" src="https://bdcatalyst.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&screenshot=No&captcha=yes" scrolling="no" height="650px" width="100%" frameborder="0" >
        </iframe>

    </PageContent>
)

export default ContactPage
