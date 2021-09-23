import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGapi } from "../helpers/useGapi";
import Loading from "../components/Loading";
import { login } from "../features/userSlice";

function Login() {
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [gapi, isLoaded] = useGapi();

  function handleLogin() {
    history.push(`/${user.id}/condition`);
  }

  function onSuccess(user) {
    const {
      id_token: idToken,
      access_token: accessToken,
    } = user.getAuthResponse();
    dispatch(login({ idToken, googleAccessToken: accessToken }));
  }

  function onFailure() {
    setStatus("로그인에 실패하였습니다.");
  }

  useEffect(() => {
    if (user.id) {
      handleLogin();

      return;
    }

    if (!isLoaded) {
      return;
    }

    gapi.signin2.render("google-login-button", {
      width: 240,
      height: 50,
      longtitle: true,
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  }, [isLoaded, user.id]);

  return (
    <>
      {(status || !isLoaded)
        ? <Loading message={status || "Waiting..."} />
        : <Loading>
          <div id="google-login-button" />
        </Loading>
      }
    </>
  );
}

export default Login;
