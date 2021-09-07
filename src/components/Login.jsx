import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import firebase from "../config/firebase";
import { login } from "../features/userSlice";
import { ERROR } from "../constants/messages";
import USER_INFO_SCOPE from "../constants/userInfoScope";
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
  const [errorStatus, setErrorStatus] = useState("");
  const hasLoggedIn = useSelector((state) => state.user.hasLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope(USER_INFO_SCOPE);
    firebase.auth().signInWithRedirect(provider);
  }

  function handleLogin() {
    history.push("/myCondition");
  }

  useEffect(async () => {
    if (hasLoggedIn) {
      handleLogin();

      return;
    }

    try {
      const { user, credential } = await firebase.auth().getRedirectResult();

      if (!user) {
        return;
      }

      const idToken = await user.getIdToken(true);
      const { accessToken } = credential;
      const refreshToken = user.refreshToken;
      const googleToken = { accessToken, refreshToken };

      dispatch(login({ idToken, googleToken }));
    } catch {
      setErrorStatus(ERROR.LOGIN_FAIL);
    }
  }, [hasLoggedIn]);

  return (
    <Wrapper>
      {errorStatus && <p>{errorStatus}</p>}
      <Logo src="/logo.png" />
      <GoogleLogin src="/google_login.png" onClick={loginWithGoogle} />
    </Wrapper>
  );
}

export default Login;
