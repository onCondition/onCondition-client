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
import CustomCategory from "./pages/CustomCategory";
import Friend from "./pages/Friend";
import Preference from "./pages/Preference";
import Detail from "./pages/Detail";
import Sleep from "./pages/Sleep";
import FriendDetail from "./pages/FriendDetail";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import { setUserInfos, logout } from "./features/userSlice";
import { getUserInfos } from "./helpers/userInfo";
import MenuBar from "./components/MenuBar";

const AppWrapper = styled.div`
  height: 100%;
`;

const PageWrapper = styled.div`
  margin-left: 300px;
  text-align: center;
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
                <PrivateRoute exact path="/:creatorId/condition">
                  <Condition />
                </PrivateRoute>
                <PrivateRoute exact path="/:creatorId/friend">
                  <Friend />
                </PrivateRoute>
                <PrivateRoute exact path="/:creatorId/meal">
                  <Meal />
                </PrivateRoute>
                <PrivateRoute exact path="/:creatorId/activity">
                  <Activity />
                </PrivateRoute>
                <PrivateRoute path="/:creatorId/sleep">
                  <Sleep />
                </PrivateRoute>
                <PrivateRoute path="/:creatorId/preference">
                  <Preference />
                </PrivateRoute>
                <PrivateRoute exact path="/:creatorId/:category">
                  <CustomCategory />
                </PrivateRoute>
                <PrivateRoute exact path="/:creatorId/friend/:friendId">
                  <FriendDetail />
                </PrivateRoute>
                <Route path="/:creatorId/:category/:ratingId">
                  <Detail />
                </Route>
                <Route path="*">
                  <p>Not Found</p>
                </Route>
              </Switch>
            </PageWrapper>
          </>
        ) : (
          <Loading />
        )}
      </AppWrapper>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
