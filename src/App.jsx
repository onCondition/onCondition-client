import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import Input from "./components/Input";
import CheckBox from "./componentLogic/CheckBox";
import Button from "./components/Button";
import Modal from "./componentLogic/Modal";

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  function handleClickButton() {
    console.log("I'm working");
  }

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <ThemeProvider theme={theme}>
          <Input name={"test"} linecolor={""}/>
          <CheckBox className={"test"} color={theme.pinkColors.mainPink} />
          <Button
            onClick={handleClickButton}
            buttonText={"textTest"}
            backgroundColor={theme.pinkColors.mainPink}
          />
          <Modal
            confirmText={"confirm"}
            innerText={"I'm contents"}
            backgroundColor={theme.mintColors.mainMint}
          />
        </ThemeProvider>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
