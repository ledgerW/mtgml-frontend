import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
import { Auth, Storage } from "aws-amplify";
import { loadUser } from "./libs/sessionLib";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";


function App(props) {
  const [authenticated, userHasAuthenticated] = useState({'auth':false, 'data':{}, 'profileURL':null});
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    async function onLoad() {
      let auth = false;
      let data = {};
      let profileURL = null;

      try {
        await Auth.currentSession();
        auth = true;
      } catch (e) {
        auth = false;
      }

      if (auth) {
        data = await loadUser();
        console.log('before if data.profilePic: ' + data.profilePic);
      }

      if (data.profilePic) {
        profileURL = await Storage.vault.get(data.profilePic);
        profileURL = await fetch(profileURL)
          .then(resp => resp.blob())
          .then(blob => {
            return URL.createObjectURL(blob);
          });
        console.log('profileURL local cache: ' + profileURL);
      }

      userHasAuthenticated({'auth':auth, 'data':data, 'profileURL':profileURL});
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
