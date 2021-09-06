import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Logout from "./components/Logout";
import styled from "styled-components";

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
    history.push("/myCondition");
  }

  function handleLogout() {
    history.push("/login");
  }

  return (
    <AppWrapper>
      <header />
      {!hasLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <p>welcome</p>
          <Logout onLogout={handleLogout} />
        </div>
      )}
    </AppWrapper>
  );
}

export default App;
