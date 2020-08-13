import React from "react";
import { Route, Switch } from "react-router-dom";

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar } from "./layouts";

// Route Views
import Analytics from "./containers/Analytics";
import Compare from "./containers/Compare";
import BlogOverview from "./containers/BlogOverview";
import UserProfile from "./containers/UserProfile";
import EditUserProfile from "./containers/EditUserProfile";
import Login from "./containers/Login";
import FileManagerList from "./containers/FileManagerList";
import FileManagerCards from "./containers/FileManagerCards";
import TransactionHistory from "./containers/TransactionHistory";
import Calendar from "./containers/Calendar";
import AddNewDeck from "./containers/AddNewDeck";
import Errors from "./containers/Errors";
import ComponentsOverview from "./containers/ComponentsOverview";
import Tables from "./containers/Tables";
import HeaderNav from "./containers/HeaderNavigation";
import IconSidebarView from "./containers/IconSidebar";

// Route Views (original)
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Decks from "./containers/Decks";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Subscribe from "./containers/Subscribe";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword";


const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);


export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact comps={{layout: DefaultLayout, container: Home}} appProps={appProps} />
      {/*User Stuff (Temp)*/}
      <UnauthenticatedRoute path="/signup" exact comps={{layout: DefaultLayout, container: Signup }} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact comps={{layout: DefaultLayout, container: Login}} appProps={appProps} />
      <UnauthenticatedRoute path="/login/reset" exact comps={{layout: DefaultLayout, container: ResetPassword}} appProps={appProps} />
      <AuthenticatedRoute path="/profile" exact comps={{layout: DefaultLayout, container: UserProfile}} appProps={appProps} />
      <AuthenticatedRoute path="/edit_profile" exact comps={{layout: DefaultLayout, container: EditUserProfile}} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact comps={{layout: DefaultLayout, container: Settings}} appProps={appProps} />
      <AuthenticatedRoute path="/settings/subscribe" exact comps={{layout: DefaultLayout, container: Subscribe}} appProps={appProps} />
      <AuthenticatedRoute path="/file_manager_list" exact comps={{layout: DefaultLayout, container: FileManagerList}} appProps={appProps} />
      <AuthenticatedRoute path="/file_manager_cards" exact comps={{layout: DefaultLayout, container: FileManagerCards}} appProps={appProps} />
      <AuthenticatedRoute path="/transaction_history" exact comps={{layout: DefaultLayout, container: TransactionHistory}} appProps={appProps} />
      {/*Decks*/}
      <AuthenticatedRoute path="/decks/new" exact comps={{layout: DefaultLayout, container: AddNewDeck}} appProps={appProps} />
      <AuthenticatedRoute path="/decks/update/:id" exact comps={{layout: DefaultLayout, container: Decks}} appProps={appProps} />
      <AuthenticatedRoute path="/decks/:id" exact comps={{layout: DefaultLayout, container: Analytics}} appProps={appProps} />
      <AuthenticatedRoute path="/compare" exact comps={{layout: DefaultLayout, container: Compare}} appProps={appProps} />
      <AuthenticatedRoute path="/build" exact comps={{layout: DefaultLayout, container: BlogOverview}} appProps={appProps} />
      {/*Card Market*/}
      <AuthenticatedRoute path="/portfolio" exact comps={{layout: DefaultLayout, container: Analytics}} appProps={appProps} />
      <AuthenticatedRoute path="/prices" exact comps={{layout: DefaultLayout, container: Compare}} appProps={appProps} />
      <AuthenticatedRoute path="/forecast" exact comps={{layout: DefaultLayout, container: BlogOverview}} appProps={appProps} />
      {/*Collection*/}
      <AuthenticatedRoute path="/manage_decks" exact comps={{layout: DefaultLayout, container: Home}} appProps={appProps} />
      <AuthenticatedRoute path="/manage_cards" exact comps={{layout: DefaultLayout, container: BlogOverview}} appProps={appProps} />
      <AuthenticatedRoute path="/forecast" exact comps={{layout: DefaultLayout, container: BlogOverview}} appProps={appProps} />
      <AuthenticatedRoute path="/tables" exact comps={{layout: DefaultLayout, container: Tables}} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <AppliedRoute comps={{layout: DefaultLayout, container: Errors}} appProps={appProps} />
    </Switch>
  );
}
