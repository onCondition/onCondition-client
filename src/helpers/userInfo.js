import Cookie from "js-cookie";
import { postRefresh } from "../api/auth";

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const ID = "id";
const CATEGORIES = "categories";

async function updateAccessToken() {
  const refreshToken = Cookie.get(REFRESH_TOKEN);
  const accessToken = await postRefresh(refreshToken);

  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

function storeUserInfos({
  accessToken, refreshToken, id, categories,
}) {
  Cookie.set(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(ID, id);
  localStorage.setItem(CATEGORIES, JSON.stringify(categories));
}

function removeUserInfos() {
  Cookie.remove(REFRESH_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(ID);
  localStorage.removeItem(CATEGORIES);
}

function getUserInfos() {
  return {
    refreshToken: Cookie.get(REFRESH_TOKEN),
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    id: localStorage.getItem(ID),
    categories: JSON.stringify(localStorage.getItem(CATEGORIES)),
  };
}

export {
  updateAccessToken,
  storeUserInfos,
  removeUserInfos,
  getUserInfos,
};
