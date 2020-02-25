import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

import { Store } from "../../../../flux";

export default () => (
  <Nav navbar className="border-left flex-row">
    {Store.isAuthenticated() && <Notifications />}
    <UserActions />
  </Nav>
);
