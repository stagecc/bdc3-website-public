import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Paragraph } from '../../components/typography'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { Button } from '../../components/buttons'
import { Card, CardHeader, CardBody } from '../../components/card'

const ToolsPage = () => (
    <PageContent width="95%" maxWidth="1080px" center gutters>
        <SEO
            title="Available Tools"
            description=""
            keywords=""
        />

        <Title>Tools & Analysis</Title>
        
        <Heading>Image Analysis</Heading>

        <Grid fluid>
            <Row>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">Picture Cohort Explorer</CardHeader>
                        <CardBody>
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste exercitationem, totam deserunt!
                            </Paragraph>
                            <Paragraph center>
                                <Button light aria-label="Launch">Launch</Button>
                                <br/><br/>
                                <Button light aria-label="Learn More">Learn More</Button>
                            </Paragraph>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">Ashok's Image Analysis</CardHeader>
                        <CardBody>
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae non ea commodi.
                            </Paragraph>
                            <Paragraph center>
                                <Button light aria-label="Launch">Launch</Button>
                                <br/><br/>
                                <Button light aria-label="Learn More">Learn More</Button>
                            </Paragraph>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Grid>

        <Heading>GWAS Pipelines</Heading>

        <Grid fluid>
            <Row>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">GWAS Analysis Pipeline 1</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo saepe consequatur, animi?
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">GWAS Analysis Pipeline 2</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo saepe consequatur, animi?
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">GWAS Analysis Pipeline 3</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo saepe consequatur, animi?
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Grid>

        <Heading>Jupyter Notebooks</Heading>

        <Grid fluid>
            <Row>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">Jupyter Notebook 1</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error suscipit deleniti nihil.
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">Jupyter Notebook 2</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error suscipit deleniti nihil.
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Grid>

        <Heading>Miscellaneous</Heading>

        <Grid fluid>
            <Row>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">Pipeline Builder</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, temporibus assumenda? Debitis.
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 4 } style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader bgColor="#eee" fgColor="#333">DocServer</CardHeader>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic minima soluta temporibus.
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Grid>



    </PageContent>
)

export default ToolsPage
