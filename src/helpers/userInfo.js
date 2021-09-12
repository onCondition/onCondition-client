import Cookie from "js-cookie";
import { postRefresh } from "../api/auth";

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const USER_ID = "userId";
const CATEGORIES = "categories";

async function updateAccessToken() {
  const refreshToken = Cookie.get(REFRESH_TOKEN);
  const accessToken = await postRefresh(refreshToken);

  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

function storeUserInfos({
  accessToken, refreshToken, userId, customCategories,
}) {
  Cookie.set(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(CATEGORIES, JSON.stringify(customCategories));
}

function removeUserInfos() {
  Cookie.remove(REFRESH_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(CATEGORIES);
}

function getUserInfos() {
  return {
    refreshToken: Cookie.get(REFRESH_TOKEN),
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    userId: localStorage.getItem(USER_ID),
    customCategories: JSON.stringify(localStorage.getItem(CATEGORIES)),
  };
}

function formatCategory(categoryName) {
  if (["sleep", "meal", "activity"].includes(categoryName)) {
    return categoryName;
  }

  const customCategories = JSON.parse(localStorage.getItem(CATEGORIES));
  const target = customCategories.find(
    ({ category }) => category === categoryName,
  );

  if (!target) {
    return null;
  }

  if (target.categoryType === "album") {
    return `customAlbum/${categoryName}`;
  }

  if (target.categoryType === "grid") {
    return `customGrid/${categoryName}`;
  }
}

export {
  updateAccessToken,
  storeUserInfos,
  removeUserInfos,
  getUserInfos,
  formatCategory,
};
