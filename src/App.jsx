import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Logout from "./components/Logout";
import styled from "styled-components";

import Meal from "./pages/Meal";

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const hasLoggedIn = useSelector((state) => state.user.hasLoggedIn);
  const history = useHistory();

  if (!hasLoggedIn) {
    history.push("/login");
  }

  function handleLogin() {
    history.push("/meal");
  }

  function handleLogout() {
    history.push("/login");
  }

  return (
    <AppWrapper>
      <Route exact path="/login">
        {!hasLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <p>welcome</p>
            <Logout onLogout={handleLogout} />
          </div>
        )}
      </Route>
      <Route exact path="/meal">
        <Meal />
      </Route>
    </AppWrapper>
  );
}

export default App;
