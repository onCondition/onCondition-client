import React from "react";
import Auth from "./components/Auth";
import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  return (
    <AppWrapper>
      <header />
      <Auth />
    </AppWrapper>
  );
}

export default App;
