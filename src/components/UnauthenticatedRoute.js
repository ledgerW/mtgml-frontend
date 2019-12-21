import React from "react";
import { Route, Redirect } from "react-router-dom";
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


export default function UnauthenticatedRoute({ component: C, component: Layout, appProps, ...rest }) {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated
          ? (
              <Layout {...props}>
                <C {...props} {...appProps} />
              </Layout>
            )
          : <Redirect
              to={redirect === "" || redirect === null ? "/" : redirect}
            />
      }
    />
  );
}

//export default function UnauthenticatedRoute({ component: C, component: Layout, appProps, ...rest }) {
//  const redirect = querystring("redirect");
//  return (
//    <Route
//      {...rest}
//      render={withTracker(props =>
//        !appProps.isAuthenticated
//          ? (
//              <Layout {...props}>
//                <C {...props} {...appProps} />
//              </Layout>
//            )
//          : <Redirect
//              to={redirect === "" || redirect === null ? "/" : redirect}
//            />
//      )}
//    />
//  );
//}
