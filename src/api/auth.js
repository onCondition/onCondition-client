import axios from "axios";
import axiosInstance from "./axiosInstance";
import { ERROR } from "../constants/messages";

async function postLogin(idToken) {
  try {
    const res = await axios.post("/api/login",
      null,
      { headers: { token: idToken } });

    const { accessToken, refreshToken } = res.data;

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(ERROR.LOGIN_FAIL);
  }
}

async function postRefresh(refreshToken) {
  try {
    const res = await axios.post("/api/refresh",
      null,
      { headers: { token: refreshToken } });

    return res.data.accessToken;
  } catch (err) {
    throw new Error(ERROR.TOKEN_REFRESH_FAIL);
  }
}

async function postGoogleToken(googleToken) {
  try {
    const res = await axiosInstance.post("api/googleFit", googleToken);

    return res;
  } catch (err) {
    throw new Error(ERROR.GOOGLE_TOKEN_NOT_AVAILABLE);
  }
}

export { postLogin, postRefresh, postGoogleToken };
