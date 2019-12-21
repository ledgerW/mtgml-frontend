import React from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout } from "../layouts";
//import withTracker from "../withTracker";

export default function AuthenticatedRoute({ component: C, component: Layout, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
          ? (
              <DefaultLayout {...props}>
                <C {...props} {...appProps} />
              </DefaultLayout>
            )
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />
      }
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
