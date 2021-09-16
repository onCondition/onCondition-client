import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Loading from "../components/Loading";
import firebase from "../config/firebase";
import { postLogin } from "../api/auth";
import { storeUserInfos } from "../helpers/userInfo";
import { ERROR } from "../constants/messages";
import USER_INFO_SCOPE from "../constants/userInfoScope";

const GoogleLogin = styled.img`
  display: absolute;
  height: 3rem;
  cursor: pointer;
`;

function Login() {
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.user);
  const history = useHistory();

  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    setStatus("Waiting...");
    provider.addScope(USER_INFO_SCOPE);
    firebase.auth().signInWithRedirect(provider);
  }

  const handleLogin = function () {
    history.push(`/${user.id}/condition`);
  };

  useEffect(() => {
    async function dispatchLoginResult() {
      setStatus("Waiting...");

      try {
        const { user, credential } = await firebase.auth().getRedirectResult();

        if (!user) {
          setStatus("");

          return;
        }

        const idToken = await user.getIdToken(true);
        const googleAccessToken = credential.accessToken;
        const { accessToken, refreshToken } = await postLogin(idToken);

        storeUserInfos({ accessToken, refreshToken, googleAccessToken });
      } catch {
        setStatus(ERROR.LOGIN_FAIL);
      }
    }

    if (user.id) {
      handleLogin();

      return;
    }

    dispatchLoginResult();
  }, [user.id]);

  return (
    <>
      {status ? (
        <Loading message={status} />
      ) : (
        <Loading>
          <GoogleLogin src="/google_login.png" onClick={loginWithGoogle} />
        </Loading>
      )}
    </>);
}

export default Login;
