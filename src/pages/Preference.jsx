import React, { useState } from "react";
import PreferenceInput from "../components/PreferenceInput";
import styled from "styled-components";
import { COPY, RESET, DELETE } from "../constants/buttons";
import albumImage from "../img/album.png";
import PreferenceOptionCheck from "../components/PreferenceOptionCheck";
import PreferenceOptionForm from "../components/PreferenceOptionForm";
import theme from "../theme/index";
import Button from "../components/Button";

const PreferenceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.3fr 0.7fr;
  justify-content: center;
  margin: auto;
`;

const CustomControlWrapper = styled.div`
  height: 600px;
  width: 800px;
  grid-template-rows: repeat(4, 1fr);
  justify-content: center;
  display: grid;
  margin: auto;
  padding: 5px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.background.comment};
  box-shadow: ${({ theme }) => theme.shadow.main};
`;

const CommentContainerWrapper = styled.div`
  height: 600px;
  width: 800px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 0.2fr 1fr 0.3fr;
  display: grid;
  margin: auto;
  padding: 5px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.background.comment};
  box-shadow: ${({ theme }) => theme.shadow.main};

  .button {
    grid-column: 2 / span 2;
  }

`;

function Preference() {
  const [input, setInput] = useState("");

  const handleClickRadioButton = (ev) => {
    setInput(ev.current.value);
  };

  const handleCopy = function ( ) {
    navigator.clipboard.writeText("Copy this text to clipboard");
  };

  const getGoogleFitData = function () {
    console.log("hi");
  };

  const handleSubmit = function () {
  //
  };

  return (
    <>
      <PreferenceWrapper>
        <PreferenceInput
          inputWidth={400}
          inputHeight={100}
          buttonWidth={100}
          buttonHeight={100}
          h1Text={"나의 유저 코드"}
          buttonText={COPY}
          name={"userCode"}
          onClick={handleCopy}
        />
        <PreferenceInput
          inputWidth={400}
          inputHeight={100}
          buttonWidth={100}
          buttonHeight={100}
          h1Text={"Google Fit 수동동기화"}
          buttonText={RESET}
          name={"getGoogleFitData"}
          onClick={getGoogleFitData}
        />
        <CommentContainerWrapper>
          <PreferenceOptionCheck
            id={"grid"}
            value={"grid"}
            color={theme.background.main}
            imageSrc={albumImage}
            onChange={handleClickRadioButton}
            checked={(input === "grid")}
          />
          <PreferenceOptionCheck
            id={"album"}
            value={"album"}
            color={theme.background.main}
            imageSrc={albumImage}
            onChange={handleClickRadioButton}
            checked={(input === "album")}
          />
          <Button
            text={"Submit"}
            onClick={handleSubmit}
          />
        </CommentContainerWrapper>
        <CustomControlWrapper>
          <PreferenceOptionForm
            inputName={"custom1"}
            inputLineColor={theme.background.sub}
            height={100}
            inputWidth={500}
            onClick={handleSubmit}
            text={DELETE}
            buttonColor={theme.background.main}
            buttonWidth={100}
          />
          <PreferenceOptionForm
            inputName={"custom2"}
            inputLineColor={theme.background.sub}
            height={100}
            inputWidth={500}
            onClick={handleSubmit}
            text={DELETE}
            buttonColor={theme.background.main}
            buttonWidth={100}
          />
          <PreferenceOptionForm
            inputName={"custom3"}
            inputLineColor={theme.background.sub}
            height={100}
            inputWidth={500}
            onClick={handleSubmit}
            text={DELETE}
            buttonColor={theme.background.main}
            buttonWidth={100}
          />
        </CustomControlWrapper>
      </PreferenceWrapper>
    </>
  );
}

export default Preference;
