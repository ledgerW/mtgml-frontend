import React from "react";
import { Route, Switch } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views (shards-dashboard)
import BlogOverview from "./containers/BlogOverview";
import UserProfileLite from "./containers/UserProfileLite";
import AddNewPost from "./containers/AddNewPost";
import Errors from "./containers/Errors";
import ComponentsOverview from "./containers/ComponentsOverview";
import Tables from "./containers/Tables";
import BlogPosts from "./containers/BlogPosts";

// Route Views (original)
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewDeck from "./containers/NewDeck";
import Decks from "./containers/Decks";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Subscribe from "./containers/Subscribe";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} layout={DefaultLayout} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} layout={DefaultLayout} appProps={appProps} />
      <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} layout={DefaultLayout} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/dashboard" exact component={BlogOverview} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/profile" exact component={UserProfileLite} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/newpost" exact component={AddNewPost} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/errors" exact component={Errors} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/components" exact component={ComponentsOverview} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/tables" exact component={Tables} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/blogposts" exact component={BlogPosts} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/settings/subscribe" exact component={Subscribe} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/decks/new" exact component={NewDeck} layout={DefaultLayout} appProps={appProps} />
      <AuthenticatedRoute path="/decks/:id" exact component={Decks} layout={DefaultLayout} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <AppliedRoute component={Errors} layout={DefaultLayout} />
    </Switch>
  );
}
