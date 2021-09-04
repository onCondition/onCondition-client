import React, { useEffect } from "react";
import firebase from "../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { login, logout } from "../features/userSlice";

function Auth() {
  const dispatch = useDispatch();
  const hasLoggedIn = useSelector(state => state.user.hasLoggedIn);

  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
  }

  function logoutWithGoogle() {
    firebase.auth().signOut();
    dispatch(logout());
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        const token = await user.getIdToken();

        dispatch(login(token));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div>
      {hasLoggedIn ? (
        <Button
          onClick={logoutWithGoogle}
          text="logout"
        />
      ) : (
        <Button
          onClick={loginWithGoogle}
          text="login"
        />
      )}
    </div>
  );
}

export default Auth;
