import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout } from "../layouts";
//import withTracker from "../withTracker";

export default function AuthenticatedRoute({ comps, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      component={props => {
        return (
          appProps.isAuthenticated
            ? (
                <comps.layout {...props} {...appProps}>
                  <comps.container {...props} {...appProps} />
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

//export default function AuthenticatedRoute({ component: C, component: Layout, appProps, ...rest }) {
//  return (
//    <Route
//      {...rest}
//      render={withTracker(props =>
//        appProps.isAuthenticated
//          ? (
//              <Layout {...props}>
//                <C {...props} {...appProps} />
//              </Layout>
//            )
//          : <Redirect
//              to={`/login?redirect=${props.location.pathname}${props.location
//                .search}`}
//            />
//      )}
//    />
//  );
//}
