import { configureStore } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
