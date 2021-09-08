import axios from "axios";
import { ERROR } from "../constants/messages";
import STATUS_CODE from "../constants/statusCodes";

const { INTERNAL_SERVER_ERROR } = STATUS_CODE;

function setAccessToken(config) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new axios.Cancel(ERROR.ACCESS_TOKEN_NOT_EXIST);
  }

  config.headers.token = accessToken;

  return config;
}

function handleRequestError(err) {
  return Promise.reject(err);
}

function parseResponseData(response) {
  return response.data;
}

function handleResponseError(err) {
  if (err.response?.status < INTERNAL_SERVER_ERROR) {
    return err.response;
  }

  return new Error(ERROR.INTERNAL_SERVER_ERROR);
}

const instance = axios.create();

instance.interceptors.request.use(setAccessToken, handleRequestError);
instance.interceptors.response.use(parseResponseData, handleResponseError);

export default instance;
