import axios from "axios";
import { store } from "../app/store";
import { ERROR } from "../constants/messages";
import STATUS_CODES from "../constants/statusCodes";
import { setError } from "../features/errorSlice";

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
  const error = (err.response?.status < STATUS_CODES.INTERNAL_SERVER_ERROR)
    ? ({
      statusCode: err.response.status,
      message: err.response.data.error,
    })
    : ({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR.INTERNAL_SERVER_ERROR,
    });

  store.dispatch(setError(error));
}

const instance = axios.create();

instance.interceptors.request.use(setAccessToken, handleRequestError);
instance.interceptors.response.use(parseResponseData, handleResponseError);

export default instance;
