import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import Detail from "./pages/Detail";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { setUserInfos, logout } from "./features/userSlice";
import { getUserInfos } from "./helpers/userInfo";
import MenuBar from "./components/MenuBar";

const AppWrapper = styled.div`
  height: 100%;
`;

const PageWrapper = styled.div`
  margin-left: 300px;
`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { hasError, ...error } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const { userId, customCategories } = getUserInfos();

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
            <MenuBar />
            <PageWrapper>
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
                <PrivateRoute path="/:creatorId/friends">
                  <p>Friends</p>
                </PrivateRoute>
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
                <PrivateRoute path="/:creatorId/friends/:friendId">
                  <p>Friend Detail</p>
                </PrivateRoute>
                <Route path="*">
                  <p>Not Found</p>
                </Route>
              </Switch>
              <Route path="/:creatorId/:category/:ratingId">
                <Detail />
              </Route>
            </PageWrapper>
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
