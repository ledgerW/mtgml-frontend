import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../libs/sessionLib";
import { Store } from "../flux";


function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


export default function UnauthenticatedRoute({ comps, appProps, ...rest }) {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      component={(props) => {
        return (
          !appProps.authenticated.auth
            ? (
                <comps.layout authenticated={appProps.authenticated} userHasAuthenticated={appProps.userHasAuthenticated} userData={appProps.userData} setUserData={appProps.setUserData} noNavbar={false}>
                  <comps.container {...props} authenticated={appProps.authenticated} userHasAuthenticated={appProps.userHasAuthenticated} userData={appProps.userData} setUserData={appProps.setUserData} />
                </comps.layout>
              )
            : <Redirect
                to={redirect === "" || redirect === null ? "/" : redirect}
              />
        );
      }}
    />
  );
}
