import React, {useState, useEffect} from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { loadUser } from "../../../../libs/sessionLib";


export default function UserActions(props) {
  let history = useHistory();
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    return;
  }, [props.authenticated]);


  function toggleUserActions() {
    setVisible(!visible);
  }


  async function handleLogout() {
    await Auth.signOut();

    props.userHasAuthenticated({'auth':false, 'data':{}});

    history.push("/");
  }

  function renderLoggedIn() {
    return (
      <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/favicon.ico")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{props.authenticated.data.userName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem tag={Link} to="profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit_profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file_manager_list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction_history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleLogout} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }

  function renderLoggedOut() {
    return (
      <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/favicon.ico")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Login</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/login" className="text-success">
            Login
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }

  return (
    <div>
      {props.authenticated.auth ? renderLoggedIn() : renderLoggedOut()}
    </div>
  );
}
