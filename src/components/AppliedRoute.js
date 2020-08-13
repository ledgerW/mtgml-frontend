import React from "react";
import { Route } from "react-router-dom";

export default function AppliedRoute({ comps, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        return (
          <comps.layout authenticated={appProps.authenticated} userHasAuthenticated={appProps.userHasAuthenticated} userData={appProps.userData} setUserData={appProps.setUserData} >
            <comps.container {...props} authenticated={appProps.authenticated} userHasAuthenticated={appProps.userHasAuthenticated} userData={appProps.userData} setUserData={appProps.setUserData} />
          </comps.layout>
        );
      }}
    />
  );
}
