import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { Accordion } from '../components/accordion'

const faqsQuery = graphql`{
    allFaqsJson {
        edges {
            node {
                question
                answer
            }
        }
    }
}`

const FaqPage = () => {
    const data = useStaticQuery(faqsQuery)
    const faqs = data.allFaqsJson.edges.map(({node}) => node)

    return (
        <PageContent width="95%" maxWidth="1080px" center gutters>
            <SEO
                title="Frequently Asked Questions"
                description=""
                keywords=""
            />
        
            <Title>Frequently Asked Questions</Title>

            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolores molestiae nisi dolore facere sapiente asperiores autem ea excepturi debitis atque itaque ipsa eius laudantium cupiditate aspernatur, voluptate, error accusamus!
            </Paragraph>
            
            {
                faqs.map((faq, i) => (
                    <Accordion title={ faq.question }>
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </Accordion>
                ))
            }

        </PageContent>
    )
}

export default FaqPage
