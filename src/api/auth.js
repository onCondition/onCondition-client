import axios from "axios";
import axiosInstance from "./axiosInstance";
import { ERROR } from "../constants/messages";

async function postLogin(idToken) {
  try {
    const res = await axios.post("/api/login",
      null,
      { headers: { authorization: `Bearer ${idToken}` } });

    const {
      accessToken, refreshToken, userId, customCategories,
    } = res.data;

    return {
      accessToken, refreshToken, userId, customCategories,
    };
  } catch (err) {
    throw new Error(ERROR.LOGIN_FAIL);
  }
}

async function postRefresh(refreshToken) {
  try {
    const res = await axios.post("/api/refresh",
      null,
      { headers: { authorization: `Bearer ${refreshToken}` } });

    return res.data.accessToken;
  } catch (err) {
    throw new Error(ERROR.TOKEN_REFRESH_FAIL);
  }
}

async function postGoogleToken(userId) {
  const res = await axiosInstance.post(`/api/${userId}/googleFit`);

  if (res) {
    return res;
  }
}

export { postLogin, postRefresh, postGoogleToken };
