import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "../config/firebase";
import { login, logout } from "../features/userSlice";
import styled from "styled-components";
import COLORS from "../constants/colors";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.MAIN_MINT};
`;

const Logo = styled.img`
  width: 40%;
  margin-top: -10em;
`;

const GoogleLogin = styled.img`
  cursor: pointer;
`;

function Login() {
  const dispatch = useDispatch();
  const hasLoggedIn = useSelector(state => state.user.hasLoggedIn);
  const history = useHistory();

  if (hasLoggedIn) {
    history.push("/");
  }

  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider);
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
    <Wrapper>
      <Logo src="/logo.png" />
      <GoogleLogin src="/google_login.png" onClick={loginWithGoogle} />
    </Wrapper>
  );
}

export default Login;
