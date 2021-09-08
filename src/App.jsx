import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme/theme";

import firebase from "./config/firebase";
import Meal from "./pages/Meal";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import { setLogin, logout } from "./features/userSlice";
import { checkTokenExist } from "./utils/tokens";

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = function () {
    history.push("/login");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        dispatch(logout());
      } else if (checkTokenExist()) {
        dispatch(setLogin());
      }
      setIsLoaded(true);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        {isLoaded ? (
          <>
            <header>
              <Logout onLogout={handleLogout} />
            </header>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute exact path="/myCondition">
                <p>my condition</p>
              </PrivateRoute>
              <PrivateRoute exact path="/meal">
                <Meal />
              </PrivateRoute>
            </Switch>
          </>
        ) : (
          <p>waiting...</p>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
