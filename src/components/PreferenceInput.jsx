import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

import Input from "../components/Input";
import Button from "./Button";

const PreferenceInputWrapper = styled.div`
  width: 600px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  margin: 30px;

  h1 {
    grid-column: 1/3;
  }
`;

function PreferenceInput({
  inputWidth,
  inputHeight,
  buttonWidth,
  buttonHeight,
  h1Text,
  buttonText,
  name,
  onClick,
}) {
  return (
    <div>
      <h1>{h1Text}</h1>
      <PreferenceInputWrapper>
        <Input
          width={inputWidth}
          height={inputHeight}
          name={name}
          lineColor={theme.point.main}
        />
        <Button
          width={buttonWidth}
          height={buttonHeight}
          onClick={onClick}
          text={buttonText}
          backgroundColor={theme.background.sub}
        />
      </PreferenceInputWrapper>
    </div>
  );
}

PreferenceInput.propTypes = {
  h1Text: PropTypes.string,
  buttonText: PropTypes.string,
  name: PropTypes.string,
  inputHeight: PropTypes.number,
  inputWidth: PropTypes.number,
  buttonHeight: PropTypes.number,
  buttonWidth: PropTypes.number,
  onClick: PropTypes.func,
};

PreferenceInput.defaultProps = {
  backgroundColor: theme.background.main,
};

export default PreferenceInput;
