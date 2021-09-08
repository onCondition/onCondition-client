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

function checkTokenExist() {
  return !!(Cookie.get(REFRESH_TOKEN) && localStorage.getItem(ACCESS_TOKEN));
}

export {
  updateAccessToken,
  storeTokens,
  removeTokens,
  checkTokenExist,
};
