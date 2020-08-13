import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { isAuthenticated } from "../libs/sessionLib";
import { Store } from "../flux";
//import withTracker from "../withTracker";

export default function AuthenticatedRoute({ comps, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        return (
          appProps.authenticated.auth
            ? (
                <comps.layout authenticated={appProps.authenticated} userHasAuthenticated={appProps.userHasAuthenticated} userData={appProps.userData} setUserData={appProps.setUserData}>
                  <comps.container {...props} authenticated={appProps.authenticated} userHasAuthenticated={appProps.userHasAuthenticated} userData={appProps.userData} setUserData={appProps.setUserData}/>
                </comps.layout>
              )
            : <Redirect
                to={`/login?redirect=${props.location.pathname}${props.location
                  .search}`}
              />
        );
      }}
    />
  );
}
