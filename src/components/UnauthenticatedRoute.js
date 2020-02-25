import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Store } from "../flux";
//import withTracker from "../withTracker";


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


export default function UnauthenticatedRoute({ comps, ...rest }) {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      component={(props, appProps) => {
        return (
          !Store.isAuthenticated()
            ? (
                <comps.layout {...props} noNavbar={false}>
                  <comps.container {...props} />
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
