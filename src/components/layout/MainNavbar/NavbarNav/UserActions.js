import React from "react";
import { Link, Redirect } from "react-router-dom";
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
import { Store, Dispatcher, Constants } from "../../../../flux";


export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  async handleLogout() {
    await Auth.signOut();
    Dispatcher.dispatch({
      actionType: Constants.USER_AUTHENTICATION
    });
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      Store.isAuthenticated()
        ? (
            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
              <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                <img
                  className="user-avatar rounded-circle mr-2"
                  src={require("./../../../../images/avatars/0.jpg")}
                  alt="User Avatar"
                />{" "}
                <span className="d-none d-md-inline-block">Sierra Brooks</span>
              </DropdownToggle>
              <Collapse tag={DropdownMenu} right small open={this.state.visible}>
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
                <DropdownItem onClick={this.handleLogout} className="text-danger">
                  <i className="material-icons text-danger">&#xE879;</i> Logout
                </DropdownItem>
              </Collapse>
            </NavItem>
          )
        : <Redirect to={'/login'}/>
    );
  }
}
