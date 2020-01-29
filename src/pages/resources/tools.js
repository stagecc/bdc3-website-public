import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Paragraph } from '../../components/typography'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { ResourceCard } from '../../components/card'

const ToolsPage = () => (
    <PageContent width="95%" maxWidth="1080px" center gutters>
        <SEO
            title="Available Tools"
            description=""
            keywords=""
        />

        <Title>Tools & Analysis</Title>
        
        <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium aliquam molestias recusandae accusamus, iure ea, quam doloribus atque porro quidem error magni quia explicabo natus enim eos optio architecto sint consectetur maiores consequatur. Dolorum, quod ullam fugiat illum ipsam tempora, laborum quis harum quas possimus, consequuntur, cumque eligendi modi qui.
        </Paragraph>

        <Grid fluid>
            <Row>
                {
                    [...Array(6).keys()].map(i => {
                        const wordCount = Math.floor(Math.random() * 35) + 5
                        const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum ab sequi obcaecati quasi doloremque nihil ea, esse non deserunt illo eligendi eius id sapiente quas aut molestiae, mollitia asperiores, inventore quaerat culpa omnis cupiditate expedita dicta natus. Facere, autem, accusamus.'.split(' ').slice(0, wordCount).join(' ')
                        return (
                            <Col key={ i } xs={ 12 } md={ 6 } lg={ 4 } style={{ margin: '3rem 0' }}>
                                <ResourceCard title="Lorem ipsum dolor" icon={ 'ICON' }>
                                    { loremIpsum }
                                </ResourceCard>
                            </Col>
                        )
                    })
                }
            </Row>
        </Grid>

    </PageContent>
)

export default ToolsPage
