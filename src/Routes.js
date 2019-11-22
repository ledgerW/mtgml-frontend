import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewDeck from "./containers/NewDeck";
import Decks from "./containers/Decks";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AppliedRoute path="/decks/new" exact component={NewDeck} appProps={appProps} />
      <AppliedRoute path="/decks/:id" exact component={Decks} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}
