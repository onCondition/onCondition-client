import React from "react";
import PreferenceInput from "../components/PreferenceInput";
import { COPY } from "../constants/buttons";

function Preference() {
  const handleCopy = function () {
    console.log("hi");
  };

  return (
    <div>
      <PreferenceInput
        inputWidth={300}
        inputHeight={100}
        buttonWidth={100}
        buttonHeight={100}
        h1Text={"나의 유저 코드"}
        buttonText={COPY}
        name={"userCode"}
        onClick={handleCopy}
      />
      <PreferenceInput
        inputWidth={300}
        inputHeight={100}
        buttonWidth={100}
        buttonHeight={100}
        h1Text={"Google Fit 수동동기화"}
        buttonText={COPY}
        name={"getGoogleFitData"}
        onClick={handleCopy}
      />
    </div>
  );
}

export default Preference;
