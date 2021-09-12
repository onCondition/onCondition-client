import React, { useState, useEffect } from "react";
import {
  Route, Switch, Redirect, useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import GlobalStyle from "./theme/global";

import firebase from "./config/firebase";
import Error from "./pages/Error";
import Condition from "./pages/Condition";
import Meal from "./pages/Meal";
import Activity from "./pages/Activity";
import Detail from "./pages/Detail";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import { setUserInfos, logout } from "./features/userSlice";
import { getUserInfos } from "./helpers/userInfo";

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { hasError, ...error } = useSelector((state) => state.error);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = function () {
    history.push("/login");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        dispatch(logout());
      } else {
        const { userId, customCategories } = getUserInfos();

        dispatch(setUserInfos({ userId, customCategories }));
      }

      setIsLoaded(true);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {hasError && <Error {...error} /> }
      <AppWrapper>
        {isLoaded ? (
          <>
            <header>
              <Logout onLogout={handleLogout} />
            </header>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute exact path="/:creator">
                <Condition />
              </PrivateRoute>
              <PrivateRoute exact path="/:creator/friends/">
                <p>Friends</p>
              </PrivateRoute>
              <PrivateRoute exact path="/:creator/meal">
                <Meal />
              </PrivateRoute>
              <PrivateRoute exact path="/:creator/activity">
                <Activity />
              </PrivateRoute>
              <PrivateRoute exact path="/:creator/sleep">
                <p>Sleep</p>
              </PrivateRoute>
              <PrivateRoute exact path="/:creator/:category/">
                <p>Custom Category</p>
              </PrivateRoute>
              <PrivateRoute exact path="/:creator/friends/:friendId">
                <p>Friend Detail</p>
              </PrivateRoute>
            </Switch>
            <Route path="/:creator/:category/:ratingId">
              <Detail />
            </Route>
            <Route path="*">
              <p>Not Found</p>
            </Route>
          </>
        ) : (
          <p>waiting...</p>
        )}
      </AppWrapper>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
