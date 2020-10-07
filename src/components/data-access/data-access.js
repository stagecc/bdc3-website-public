import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useFence, useWindowWidth } from '../../hooks'
import { Dots as LoadingDots } from '../../components/loading'
import { DownloadIcon } from '../../components/icons'
import { Button } from '../../components/buttons'
import { Subheading, Paragraph } from '../../components/typography'
import { Card, CardHeader, CardBody } from '../../components/card'
import { ExternalLink } from '../../components/link'

const ProjectList = styled.select`
    width: 100%;
`

const ProjectOption = styled.option`
    padding: 0.5rem;
`

const Wrapper = styled.div`
    // margin-top: 4rem;
    // display: flex;
    // flex-direction: ${ props => props.compact ? 'column' : 'row' };
    // justify-content: space-around;
    // align-items: ${ props => props.compact ? 'center' : 'flex-start' };;
`
const DownloadButton = styled(Button)`
    // width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const DataAccess = ({ location }) => {
    const { user, projects, isLoading } = useFence(location)
    const { isCompact } = useWindowWidth()
    const fenceCheckAccessUrl = `${ process.env.GATSBY_FENCE_AUTH_ROOT }/user/oauth2/authorize?idp=fence&client_id=${ process.env.GATSBY_FENCE_CLIENT_ID }&redirect_uri=${ process.env.NODE_ENV === 'production' ? location.origin : 'https://staging.biodatacatalyst.nhlbi.nih.gov' }/resources/data&response_type=id_token+token&scope=openid+user&nonce=2bfe151af238d21f48d8a8bf8bbec408838c8dc0ace6b4c5621ac9dfa157798b`

    const handleDownload = () => {
        const csvData = `Project\n${ projects.join(`\n`) }`
        const url = window.URL.createObjectURL(new Blob([csvData], { type: 'text/csv' }))
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.setAttribute('download', `${ user.name }-projects.csv`)
        document.body.appendChild(downloadLink)
        downloadLink.click()
    }

    return (
        <Card>
            <CardHeader>My Access</CardHeader>
            <CardBody>
                { isLoading && <LoadingDots /> }
                {
                    !isLoading && user && projects ? (
                        <Wrapper compact={ isCompact }>
                            <Subheading>You are logged in as { user.name }</Subheading>
                            {
                                projects.length
                                ? (
                                    <Fragment>
                                        <Paragraph>
                                            You have access to { projects.length } projects.
                                        </Paragraph>
                                        <ProjectList size="3">
                                            { projects.map(project => <ProjectOption key={ project}>{ project }</ProjectOption>) }
                                        </ProjectList>
                                        <br/><br/>
                                        <Paragraph>
                                            <DownloadButton onClick={ handleDownload }><span>Download Project List</span>&nbsp;&nbsp;<DownloadIcon size="24" fill="#fff" /></DownloadButton>
                                        </Paragraph>
                                    </Fragment>
                                ) : (
                                    <Paragraph>
                                        You don't have access to any projects yet.
                                    </Paragraph>
                                )
                            }
                        </Wrapper>
                    ) : (
                        <Fragment>
                            <Paragraph>
                                Log in with your eRA Commons credentials to determine which datasets to which you currently have access.
                            </Paragraph>
                            <Paragraph>
                                For additional guidance on How to check what data you have access to on BioData Catalyst, see a page dedicated to this topic
                                in our <ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/data-access/check-my-access-to-data">BioData Catalyst documentation</ExternalLink>.
                            </Paragraph>
                                
                            <Paragraph center style={{ margin: '2rem' }}>
                                <Button as="a" href={ fenceCheckAccessUrl }>Check My Access</Button>
                            </Paragraph>
                        </Fragment>
                    )
                }
            </CardBody>
        </Card>
    )
}
