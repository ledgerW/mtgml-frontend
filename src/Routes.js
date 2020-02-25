import React from "react";
import { Route, Switch } from "react-router-dom";

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar } from "./layouts";

// Route Views
import Analytics from "./containers/Analytics";
import OnlineStore from "./containers/OnlineStore";
import BlogOverview from "./containers/BlogOverview";
import UserProfile from "./containers/UserProfile";
import EditUserProfile from "./containers/EditUserProfile";
import Login from "./containers/Login";
import FileManagerList from "./containers/FileManagerList";
import FileManagerCards from "./containers/FileManagerCards";
import TransactionHistory from "./containers/TransactionHistory";
import Calendar from "./containers/Calendar";
import AddNewPost from "./containers/AddNewPost";
import Errors from "./containers/Errors";
import ComponentsOverview from "./containers/ComponentsOverview";
import Tables from "./containers/Tables";
import BlogPosts from "./containers/BlogPosts";
import HeaderNav from "./containers/HeaderNavigation";
import IconSidebarView from "./containers/IconSidebar";

// Route Views (original)
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import NewDeck from "./containers/NewDeck";
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
      <UnauthenticatedRoute path="/" exact comps={{layout: DefaultLayout, container: Home}} />
      {/*User Stuff (Temp)*/}
      <UnauthenticatedRoute path="/signup" exact comps={{layout: DefaultLayout, container: Signup}} />
      <UnauthenticatedRoute path="/login" exact comps={{layout: DefaultLayout, container: Login}} />
      <UnauthenticatedRoute path="/login/reset" exact comps={{layout: DefaultLayout, container: ResetPassword}} />
      <AuthenticatedRoute path="/profile" exact comps={{layout: DefaultLayout, container: UserProfile}} />
      <AuthenticatedRoute path="/edit_profile" exact comps={{layout: DefaultLayout, container: EditUserProfile}} />
      <AuthenticatedRoute path="/settings" exact comps={{layout: DefaultLayout, container: Settings}} />
      <AuthenticatedRoute path="/settings/subscribe" exact comps={{layout: DefaultLayout, container: Subscribe}} />
      <AuthenticatedRoute path="/file_manager_list" exact comps={{layout: DefaultLayout, container: FileManagerList}} />
      <AuthenticatedRoute path="/file_manager_cards" exact comps={{layout: DefaultLayout, container: FileManagerCards}} />
      <AuthenticatedRoute path="/transaction_history" exact comps={{layout: DefaultLayout, container: TransactionHistory}} />
      {/*Decks*/}
      <AuthenticatedRoute path="/analyze" exact comps={{layout: DefaultLayout, container: Analytics}} />
      <AuthenticatedRoute path="/compare" exact comps={{layout: DefaultLayout, container: OnlineStore}} />
      <AuthenticatedRoute path="/build" exact comps={{layout: DefaultLayout, container: BlogOverview}} />
      {/*Card Market*/}
      <AuthenticatedRoute path="/portfolio" exact comps={{layout: DefaultLayout, container: Analytics}} />
      <AuthenticatedRoute path="/prices" exact comps={{layout: DefaultLayout, container: OnlineStore}} />
      <AuthenticatedRoute path="/forecast" exact comps={{layout: DefaultLayout, container: BlogOverview}} />
      {/*Collection*/}
      <AuthenticatedRoute path="/manage_decks" exact comps={{layout: DefaultLayout, container: Home}} />
      <AuthenticatedRoute path="/manage_cards" exact comps={{layout: DefaultLayout, container: BlogOverview}} />
      <AuthenticatedRoute path="/forecast" exact comps={{layout: DefaultLayout, container: BlogOverview}} />
      <AuthenticatedRoute path="/decks/new" exact comps={{layout: DefaultLayout, container: NewDeck}} />
      <AuthenticatedRoute path="/decks/:id" exact comps={{layout: DefaultLayout, container: Decks}} />
      { /* Finally, catch all unmatched routes */ }
      <AppliedRoute comps={{layout: DefaultLayout, container: Errors}} />
    </Switch>
  );
}
