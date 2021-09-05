import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Meal from "./pages/Meal";

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  return (
    <AppWrapper>
      <Route path="/meal">
        <Meal />
      </Route>
    </AppWrapper>
  );
}

export default App;
