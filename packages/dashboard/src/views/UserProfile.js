import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'shards-react'

import PageTitle from '../components/common/PageTitle'
import InfoSidebar from '../components/user-profile/InfoSidebar'
import UserDetails from '../components/user-profile/UserDetails'
import UserLogin from '../components/user-profile/UserLogin'

const UserProfileLite = props => {
    const { isLoggedIn, user } = props

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    title="User Profile"
                    subtitle="Overview"
                    md="12"
                    className="ml-sm-auto mr-sm-auto"
                />
            </Row>
            <Row
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Col lg="6">
                    <InfoSidebar />
                </Col>
                <Col lg="6">
                    {isLoggedIn ? <UserDetails user={user} /> : <UserLogin />}
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(UserProfileLite)
