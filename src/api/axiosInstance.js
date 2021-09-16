import axios from "axios";
import { store } from "../app/store";
import { ERROR } from "../constants/messages";
import STATUS_CODES from "../constants/statusCodes";
import { setError } from "../features/errorSlice";
import { getTokens, updateAccessToken } from "../helpers/userInfo";

async function setAccessToken(config) {
  const { accessToken } = getTokens();

  if (!accessToken) {
    throw new axios.Cancel(ERROR.ACCESS_TOKEN_NOT_EXIST);
  }
  const oneSecondInMill = 1000;
  const isExpired = accessToken.exp < (Date.now() / oneSecondInMill);

  let token = accessToken.token;

  if (isExpired) {
    await updateAccessToken();
    token = getTokens().accessToken.token;
  }

  config.headers.authorization = `Bearer ${token}`;

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

const baseURL = process.env.REACT_APP_NODE_ENV === "development"
  ? "/api"
  : process.env.REACT_APP_API_SERVER_URI;
const instance = axios.create({ baseURL });

instance.interceptors.request.use(setAccessToken, handleRequestError);
instance.interceptors.response.use(parseResponseData, handleResponseError);

export default instance;
