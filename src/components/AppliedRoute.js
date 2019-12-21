import React from "react";
import { Route } from "react-router-dom";
//import withTracker from "../withTracker";

import { DefaultLayout } from "../layouts";

export default function AppliedRoute({ component: C, component: layout, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <DefaultLayout {...props}>
          <C {...props} {...appProps} />
        </DefaultLayout>
      )}
    />
  );
}


//export default function AppliedRoute({ component: C, component: Layout, appProps, ...rest }) {
//  return (
//    <Route
//      {...rest}
//      render={withTracker(props => (
//        <Layout {...props}>
//          <C {...props} {...appProps} />
//        </Layout>
//      ))}
//    />
//  );
//}
