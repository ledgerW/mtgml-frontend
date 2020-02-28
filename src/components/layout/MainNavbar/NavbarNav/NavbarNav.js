import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

import { Store } from "../../../../flux";

export default ({authenticated, userHasAuthenticated, userData, setUserData}) => (
  <Nav navbar className="border-left flex-row">
    {authenticated.auth && <Notifications />}
    <UserActions authenticated={authenticated} userHasAuthenticated={userHasAuthenticated} userData={userData} setUserData={setUserData} />
  </Nav>
);
