import React from "react";
import ReactDOM from "react-dom";
import Modal from "./componentLogic/Modal";
import { store } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./config/firebase";

const reactReduxFirebaseConfig = {};
const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(<React.StrictMode>
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
      <Router>
        <Modal />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
</React.StrictMode>,
document.getElementById("root"));
