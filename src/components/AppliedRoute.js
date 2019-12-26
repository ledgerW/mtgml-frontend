import React from "react";
import { Route } from "react-router-dom";
//import withTracker from "../withTracker";

export default function AppliedRoute({ comps, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      component={props => {
        return (
          <comps.layout {...props} {...appProps}>
            <comps.container {...props} {...appProps} />
          </comps.layout>
        );
      }}
    />
  );
}
