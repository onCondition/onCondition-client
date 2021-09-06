import axios from "axios";
import { ERROR } from "../constants/messages";

const api = {};

api.login = async function (idToken) {
  try {
    const res = await axios.post("/api/login",
      null,
      { headers: { token: idToken } });

    const { accessToken, refreshToken } = res.data;

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(ERROR.LOGIN_FAIL);
  }
};

api.refresh = async function (refreshToken) {
  try {
    const res = await axios.post("/api/refresh",
      null,
      { headers: { token: refreshToken } });

    return res.data.accessToken;
  } catch (err) {
    throw new Error(ERROR.TOKEN_REFRESH_FAIL);
  }
};

export default api;
