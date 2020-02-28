import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import { loadUser } from "./libs/sessionLib";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";


function App(props) {
  const [authenticated, userHasAuthenticated] = useState({'auth':false, 'data':{}});
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    async function onLoad() {
      let auth = false;
      let data = {};

      try {
        await Auth.currentSession();
        auth = true;
      } catch (e) {
        auth = false;
      }

      console.log('App Effect auth: ' + auth);

      if (auth) {
        data = await loadUser();
      }

      userHasAuthenticated({'auth':auth, 'data':data})
    }

    onLoad();
  }, []);

  return (
    <div>
      <Routes appProps={{ authenticated, userHasAuthenticated, userData, setUserData }} />
    </div>
  );
}

export default withRouter(App);
