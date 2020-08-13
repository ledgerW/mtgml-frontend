import { Auth, API } from "aws-amplify";


export function loadUser(email) {
  let data = {};
  let reqInit = {
    queryStringParameters: {
      email: email
    }
  };

  try {
    data = API.get("mtgml", "/users", reqInit);
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
