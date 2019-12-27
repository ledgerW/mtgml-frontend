import React from "react";
import { Route, Switch } from "react-router-dom";

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar } from "./layouts";

// Route Views
import Analytics from "./containers/Analytics";
import OnlineStore from "./containers/OnlineStore";
import BlogOverview from "./containers/BlogOverview";
import UserProfile from "./containers/UserProfile";
import UserProfileLite from "./containers/UserProfileLite";
import EditUserProfile from "./containers/EditUserProfile";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ChangePassword from "./containers/ChangePassword";
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
//import ChangePassword from "./containers/ChangePassword";
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
      <AppliedRoute path="/" exact comps={{layout: DefaultLayout, container: Home}} />
      <UnauthenticatedRoute path="/login" exact comps={{layout: BlankIconSidebarLayout, container: Login}} />
      <UnauthenticatedRoute path="/login/reset" exact comps={{layout: BlankIconSidebarLayout, container: ResetPassword}} />
      <UnauthenticatedRoute path="/signup" exact comps={{layout: BlankIconSidebarLayout, container: Signup}} />
      <AuthenticatedRoute path="/dashboard" exact comps={{layout: DefaultLayout, container: Analytics}} />
      <AuthenticatedRoute path="/ecommerce" exact comps={{layout: DefaultLayout, container: OnlineStore}} />
      <AuthenticatedRoute path="/overview" exact comps={{layout: DefaultLayout, container: BlogOverview}} />
      <AuthenticatedRoute path="/profile" exact comps={{layout: DefaultLayout, container: UserProfile}} />
      <AuthenticatedRoute path="/edit_profile" exact comps={{layout: DefaultLayout, container: EditUserProfile}} />
      <AuthenticatedRoute path="/file_manager_list" exact comps={{layout: DefaultLayout, container: FileManagerList}} />
      <AuthenticatedRoute path="/file_manager_cards" exact comps={{layout: DefaultLayout, container: FileManagerCards}} />
      <AuthenticatedRoute path="/transaction_history" exact comps={{layout: DefaultLayout, container: TransactionHistory}} />
      <AuthenticatedRoute path="/calendar" exact comps={{layout: DefaultLayout, container: Calendar}} />
      <AuthenticatedRoute path="/new_post" exact comps={{layout: DefaultLayout, container: AddNewPost}} />
      <AuthenticatedRoute path="/errors" exact comps={{layout: DefaultLayout, container: Errors}} />
      <AuthenticatedRoute path="/components" exact comps={{layout: DefaultLayout, container: ComponentsOverview}} />
      <AuthenticatedRoute path="/tables" exact comps={{layout: DefaultLayout, container: Tables}} />
      <AuthenticatedRoute path="/blog_posts" exact comps={{layout: DefaultLayout, container: BlogPosts}} />
      <AuthenticatedRoute path="/header_nav" exact comps={{layout: HeaderNavigation, container: HeaderNav}} />
      <AuthenticatedRoute path="/icon_side_nav" exact comps={{layout: IconSidebar, container: IconSidebarView}} />
      <AuthenticatedRoute path="/settings" exact comps={{layout: BlankIconSidebarLayout, container: Settings}} />
      <AuthenticatedRoute path="/settings/password" exact comps={{layout: BlankIconSidebarLayout, container: ChangePassword}} />
      <AuthenticatedRoute path="/settings/email" exact comps={{layout: BlankIconSidebarLayout, container: ChangeEmail}} />
      <AuthenticatedRoute path="/settings/subscribe" exact comps={{layout: BlankIconSidebarLayout, container: Subscribe}} />
      <AuthenticatedRoute path="/decks/new" exact comps={{layout: BlankIconSidebarLayout, container: NewDeck}} />
      <AuthenticatedRoute path="/decks/:id" exact comps={{layout: BlankIconSidebarLayout, container: Decks}} />
      { /* Finally, catch all unmatched routes */ }
      <AppliedRoute comps={{layout: DefaultLayout, container: Errors}} />
    </Switch>
  );
}
