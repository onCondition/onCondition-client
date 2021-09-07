import qs from "qs";
import Cookie from "js-cookie";
import { postRefresh } from "./auth";

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";

async function updateAccessToken() {
  const refreshToken = Cookie.get(REFRESH_TOKEN);
  const accessToken = await postRefresh(refreshToken);

  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

function storeTokens({ accessToken, refreshToken }) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  Cookie.set(REFRESH_TOKEN, refreshToken);
}

function removeTokens() {
  localStorage.removeItem(ACCESS_TOKEN);
  Cookie.remove(REFRESH_TOKEN);
}

function getGoogleTokenRequestUrl() {
  const SCOPE = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
  ].join(" ");
  const queryString = qs.stringify({
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_USER_CONSENT_REDIRECT_URI,
    response_type: "token",
    scope: SCOPE,
  });

  return process.env.REACT_APP_AUTH_URI + "?" + queryString;
}

function parseGoogleToken(queryString) {
  const tokenInfo = qs.parse(queryString);
  const {
    access_token: accessToken,
    token_type: tokenType,
    expires_in: expiresIn,
    scope,
  } = tokenInfo;

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    tokenType,
    expiresIn,
    scope,
  };
}

export {
  updateAccessToken,
  storeTokens,
  removeTokens,
  getGoogleTokenRequestUrl,
  parseGoogleToken,
};
