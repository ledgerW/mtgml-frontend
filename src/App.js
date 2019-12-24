import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
import { Auth } from "aws-amplify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";


function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <div>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated, newUser, setNewUser }} />
    </div>
  );
}

export default withRouter(App);
