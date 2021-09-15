import Cookie from "js-cookie";
import { postRefresh } from "../api/auth";

const GOOGLE_ACCESS_TOKEN = "googleAccessToken";
const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const USER_ID = "userId";
const CATEGORIES = "categories";

function storeUserInfos({
  accessToken, refreshToken, userId, customCategories, googleAccessToken,
}) {
  Cookie.set(GOOGLE_ACCESS_TOKEN, googleAccessToken);
  Cookie.set(REFRESH_TOKEN, JSON.stringify(refreshToken));
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(CATEGORIES, JSON.stringify(customCategories));
}

function removeUserInfos() {
  Cookie.remove(REFRESH_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(CATEGORIES);
}

function getTokens() {
  return {
    refreshToken: Cookie.get(REFRESH_TOKEN),
    accessToken: JSON.parse(localStorage.getItem(ACCESS_TOKEN)),
  };
}

function getUserInfos() {
  return {
    userId: localStorage.getItem(USER_ID),
    customCategories: JSON.parse(localStorage.getItem(CATEGORIES)),
  };
}

async function updateAccessToken() {
  const refreshToken = JSON.parse(Cookie.get(REFRESH_TOKEN));
  const accessToken = await postRefresh(refreshToken.token);

  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
}

export {
  storeUserInfos,
  removeUserInfos,
  getUserInfos,
  getTokens,
  updateAccessToken,
};
