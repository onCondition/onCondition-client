import React from "react";
import PropTypes from "prop-types";
import Input from "../components/Input";
import Button from "../components/Button";
import theme from "../theme";

function PreferenceOptionForm({
  height,
  inputWidth,
  buttonWidth,
  inputName,
  buttonColor,
  inputLineColor,
  onClick,
  text,
}) {
  return (
    <form>
      <Input
        name={inputName}
        lineColor={inputLineColor}
        height={height}
        width={inputWidth}
      />
      <Button
        onClick={onClick}
        text={text}
        backgroundColor={buttonColor}
        width={buttonWidth}
        height={height}
      />
    </form>
  );
}

PreferenceOptionForm.propTypes = {
  inputLineColor: PropTypes.string,
  color: PropTypes.oneOf(Object.values(theme.background)),
  onSubmit: PropTypes.func,
  inputName: PropTypes.string,
  inputWidth: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonWidth: PropTypes.number,
  height: PropTypes.number,
};

PreferenceOptionForm.defaultProps = {
  buttonColor: theme.background.main,
  lineColor: theme.background.main,
  text: "확인",
};

export default PreferenceOptionForm;
