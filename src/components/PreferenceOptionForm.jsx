import React from "react";
import PropTypes from "prop-types";
import Input from "../components/Input";
import Button from "../components/Button";
import theme from "../theme";

function PreferenceOptionForm({
  inputName,
  inputLineColor,
  inputHeight,
  inputWidth,
  onClick,
  text,
  buttonColor,
  buttonWidth,
  buttonHeight,
}) {
  return (
    <form>
      <Input
        name={inputName}
        lineColor={inputLineColor}
        height={inputHeight}
        width={inputWidth}
      />
      <Button
        onClick={onClick}
        text={text}
        backgroundColor={buttonColor}
        width={buttonWidth}
        height={buttonHeight}
      />
    </form>
  );
}

PreferenceOptionForm.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  onSubmit: PropTypes.func,
  inputName: PropTypes.string,
  inputLineColor: PropTypes.string,
  inputHeight: PropTypes.number,
  inputWidth: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonWidth: PropTypes.number,
  buttonHeight: PropTypes.number,
};

PreferenceOptionForm.defaultProps = {
  buttonColor: theme.background.main,
  lineColor: theme.background.main,
  text: "확인",
};

export default PreferenceOptionForm;
