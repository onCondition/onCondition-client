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
import CustomAlbum from "./pages/CustomAlbum";
import Friend from "./pages/Friend";
import Detail from "./pages/Detail";
import FriendDetail from "./pages/FriendDetail";

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
  const { userId, customCategories } = getUserInfos();

  const handleLogout = function () {
    history.push("/login");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        dispatch(logout());
      }

      setIsLoaded(true);
    });
  }, []);

  dispatch(setUserInfos({ userId, customCategories }));

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
                <Redirect to={`/${userId}/condition`} />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/:creatorId/condition">
                <Condition />
              </PrivateRoute>
              <PrivateRoute path="/:creatorId/friends/:friendId">
                <FriendDetail />
              </PrivateRoute>
              <PrivateRoute path="/:creatorId/friends">
                <Friend />
              </PrivateRoute>
              <Route path="/:creatorId/:category/:ratingId">
                <Detail />
              </Route>
              <PrivateRoute path="/:creatorId/meal">
                <Meal />
              </PrivateRoute>
              <PrivateRoute path="/:creatorId/activity">
                <Activity />
              </PrivateRoute>
              <PrivateRoute path="/:creatorId/sleep">
                <p>Sleep</p>
              </PrivateRoute>
              <PrivateRoute path="/:creatorId/:category">
                <CustomAlbum />
              </PrivateRoute>
              <Route path="*">
                <p>Not Found</p>
              </Route>
            </Switch>
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
