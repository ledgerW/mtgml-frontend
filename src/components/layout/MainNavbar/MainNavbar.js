import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar, NavbarBrand } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";

import { LAYOUT_TYPES } from "../../../utils/constants";

const MainNavbar = ({ layout, stickyTop, authenticated, userHasAuthenticated, userData, setUserData, ...rest }) => {
  const isHeaderNav = layout === LAYOUT_TYPES.HEADER_NAVIGATION;
  const classes = classNames(
    "flex",
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container fluid={!isHeaderNav || null} className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {isHeaderNav && (
            <NavbarBrand href="/" style={{ lineHeight: "25px" }}>
              <div className="d-table m-auto">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1 ml-3"
                  style={{ maxWidth: "25px" }}
                  src={require("../../../images/favicon.ico")}
                  alt="MagicML"
                />
                <span className="d-none d-md-inline ml-1">
                  MagicML
                </span>
              </div>
            </NavbarBrand>
          )}
          <NavbarSearch/>
          <NavbarNav authenticated={authenticated} userHasAuthenticated={userHasAuthenticated} userData={userData} setUserData={setUserData} />
          <NavbarToggle/>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  authenticated: PropTypes.object,
  userHasAuthenticated: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
