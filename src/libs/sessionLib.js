import { Auth, API } from "aws-amplify";


export function loadUser() {
  let data = {};
  try {
    data = API.get("mtgml", "/users");
  } catch (e) {
    data = {};
  }

  return data;
}


export async function isAuthenticated() {
  let session = false;
  try {
    await Auth.currentSession();
    session = true;
  } catch (e) {
    session = false;
  }

  return session;
}
