import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { IconButton, Icon, Drawer, Sidenav, Dropdown, Nav} from 'rsuite'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { logout, getUser } from '../../containers/App/actions'
import { makeSelectIsAuthenticated, makeSelectScope, makeSelectRole, makeSelectUser } from '../../containers/App/selectors';

import RoleValidator from 'components/RoleValidator';

const MobileHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 4em;
    background-color: #F7F7FA;
    padding: 0.5em 1em 0 1em;
    background-color: ${props => props.darkTheme ? '#2b2b2c' : '#F5F5F5'} !important;
`

const StyledImage = styled.img`
    height: 12px;
    width: auto;
    margin-left: -2em;
`

const StyledDrawerLogo = styled.img`
    height: 15px;
    width: auto;
`

const StyledDrawer = styled(Drawer)`
    .rs-drawer-content {
        background-color: ${props => props.darkTheme ? '#313131' : '#F5F5F5'} !important;
    }
`

const StyledSidenav = styled(Sidenav)`
    background-color: ${props => props.darkTheme ? '#313131' : '#F5F5F5'} !important;
`

const HeaderSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${props => props.justify};
    flex: 1;
`

const WalletBalance = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
`

const StyledAccountData = styled.div`
    bottom: 5px; 
    display: flex;
    flex-direction: row;
`

class Header extends Component {

    state = {
        show: false,
    }

    componentWillMount = () => {
        const {getUser, isAuthenticated} = this.props;
        if (isAuthenticated) {
            getUser();
        }
    }

    toggleMenu = () => {
        this.setState({show: !this.state.show});
    }

    handleMenuClick = (eventKey) => {
        const {handleLocationChange} = this.props;
        this.setState({show: false});
    }

    handleLogout = () => {
        const {logout} = this.props;
        logout();
    }

    validateScope = (scopes, roles) => {
        const {scope, role} = this.props;
        if (!scope || !role || !scopes || !roles) return false;
        if (scopes.indexOf(scope) < 0) return false;
        if (roles.indexOf(role) < 0) return false;
        return true;
    }

    render() {
        const {pathname, isAuthenticated, user} = this.props;
        const {show} = this.state;
        return (
            <MobileHeaderContainer>
                <HeaderSection>
                    <IconButton 
                        icon={<Icon icon="bars" />}  
                        onClick={this.toggleMenu}
                    />
                </HeaderSection>
                <HeaderSection justify="flex-end">
                    <Link to="/"><StyledImage src={require('images/logo_transparent.png')}/></Link>
                </HeaderSection>
                {user && user.wallet ? (
                    <WalletBalance>
                        <p>{user.wallet.balance}</p>
                        <Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/>
                    </WalletBalance>
                ) : (
                    <HeaderSection />
                )}
                <StyledDrawer
                    placement="left"
                    size="xs"
                    show={show}
                    onHide={this.toggleMenu}
                    full
                >
                    <Drawer.Header>
                        <Drawer.Title><StyledDrawerLogo src={require('images/logo_transparent.png')}/></Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <StyledSidenav>
                            <Sidenav.Body>
                            <Nav activeKey={pathname}>
                                <Link to="/" ><Nav.Item onClick={() => this.handleMenuClick('/')} eventKey="/" icon={<Icon icon="home" />} å>Home</Nav.Item></Link>
                            </Nav>
                            { isAuthenticated ? (
                                <Nav>
                                    {this.validateScope(['GUEST', 'BRAND', 'AGENCY'], ['OWNER', 'MANAGER', 'REGULAR', 'VIP', 'VVIP', 'STAFF'])  && (
                                         <Link to="/wallet-history" ><Nav.Item onClick={() => this.handleMenuClick('/wallet-actions')} eventKey="/wallet-actions" icon={<Icon icon="profile" />} >My wallet ({user && user.first_name} {user && user.last_name})</Nav.Item></Link>
                                    )}
                                    {this.validateScope(['AGENCY'], ['OWNER', 'MANAGER', 'STAFF']) && (
                                         <Link to="/scanner" ><Nav.Item onClick={() => this.handleMenuClick('/scanner')} eventKey="/scanner" icon={<Icon icon="qrcode" />} >Scanner</Nav.Item></Link>
                                    )}
                                    {this.validateScope(['GUEST', 'BRAND'], ['OWNER', 'MANAGER', 'REGULAR', 'VIP', 'VVIP']) && user && user.is_age_verified && (
                                         <Link to="/add-credits" ><Nav.Item onClick={() => this.handleMenuClick('/add-credits')} eventKey="/add-credits" icon={<Icon icon="circle" />} >Add Credits</Nav.Item></Link>
                                    )}
                                    {this.validateScope(['GUEST', 'BRAND'], ['OWNER', 'MANAGER', 'REGULAR', 'VIP', 'VVIP']) && user && user.is_age_verified && (
                                         <Link to="/transfer-credits" ><Nav.Item onClick={() => this.handleMenuClick('/trasfer-credits')} eventKey="/transfer-credits" icon={<Icon icon="exchange" />} >Transfer Credits</Nav.Item></Link>
                                    )}
                                    <Nav.Item onClick={this.handleLogout}>Logout</Nav.Item>
                                </Nav>
                            ) : (
                                <Nav pullRight>
                                    {/* <Nav.Item icon={<Icon icon='moon-o' />}>Dark Mode<StyledToggle size="md" onChange={toggleTheme} checked={darkTheme} /></Nav.Item> */}
                                    <Link to="/login"><Nav.Item onClick={() => this.handleMenuClick('/login')}  icon={<Icon icon="user" />} >Login</Nav.Item></Link>
                                    <Link to="/signup"><Nav.Item onClick={() => this.handleMenuClick('/signup')}  icon={<Icon icon="user" />} >Signup</Nav.Item></Link>
                                </Nav>
                            )}
                            </Sidenav.Body>
                        </StyledSidenav>
                    </Drawer.Body>
                </StyledDrawer>
            </MobileHeaderContainer>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    scope: PropTypes.string, 
    role: PropTypes.string, 
  };
  
const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeSelectIsAuthenticated(),
    scope: makeSelectScope(),
    role: makeSelectRole(),
    user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUser()),
})


const withConnect = connect(
mapStateToProps,
mapDispatchToProps
);

export default compose(withConnect)(Header);
