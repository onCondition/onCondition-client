import { postRefresh } from "../api/auth";

const GOOGLE_ACCESS_TOKEN = "googleAccessToken";
const REFRESH_TOKEN = "refreshToken";
const REFRESH_EXPIRED_AT = "refreshToken-expiredAt";
const ACCESS_TOKEN = "accessToken";
const ACCESS_TOKEN_EXPIRED_AT = "accessToken-expiredAt";

function storeUserInfos({
  accessToken, refreshToken, googleAccessToken,
}) {
  localStorage.setItem(GOOGLE_ACCESS_TOKEN, googleAccessToken);
  localStorage.setItem(ACCESS_TOKEN, accessToken.token);
  localStorage.setItem(ACCESS_TOKEN_EXPIRED_AT, accessToken.exp);
  localStorage.setItem(REFRESH_TOKEN, refreshToken.token);
  localStorage.setItem(REFRESH_EXPIRED_AT, refreshToken.exp);
}

function removeUserInfos() {
  localStorage.clear();
}

function getTokens() {
  return {
    googleAccessToken: localStorage.getItem(GOOGLE_ACCESS_TOKEN),
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    accessTokenExp: localStorage.getItem(ACCESS_TOKEN_EXPIRED_AT),
    refreshToken: localStorage.getItem(REFRESH_TOKEN),
    refreshTokenExp: localStorage.getItem(REFRESH_EXPIRED_AT),
  };
}

async function updateAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const accessToken = await postRefresh(refreshToken);

  localStorage.setItem(ACCESS_TOKEN, accessToken.token);
  localStorage.setItem(ACCESS_TOKEN_EXPIRED_AT, accessToken.exp);
}

export {
  storeUserInfos,
  removeUserInfos,
  getTokens,
  updateAccessToken,
};
