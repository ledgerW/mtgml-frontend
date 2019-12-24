import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default (appProps) => (
  <Nav navbar className="border-left flex-row">
    <Notifications />
    <UserActions {...appProps}/>
  </Nav>
);
