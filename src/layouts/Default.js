import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

import { isAuthenticated } from "../libs/sessionLib";
import { Store } from "../flux";


function DefaultLayout({ children, noNavbar, noFooter, authenticated, userHasAuthenticated, userData, setUserData }) {
  return (
    <Container fluid>
      <Row>
        {authenticated.auth && <MainSidebar />}
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!noNavbar && <MainNavbar authenticated={authenticated} userHasAuthenticated={userHasAuthenticated} userData={userData} setUserData={setUserData}/>}
          {children}
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  );
}

DefaultLayout.propTypes = {
  authenticated: PropTypes.object,
  userHasAuthenticated: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
