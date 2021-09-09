import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBoxComponent from "../components/CheckBoxComponent";
import theme from "../theme";

function CheckBox({ className, color }) {
  const [checkboxVisibility, setCheckboxVisibility] = useState(false);

  function handleCheckboxChange(ev) {
    setCheckboxVisibility(ev.target.checked);
  }

  return (
    <CheckBoxComponent
      className={className}
      color={color}
      onClick={handleCheckboxChange}
      checked={checkboxVisibility}
    />
  );
}

CheckBox.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(theme.background)),
};

export default CheckBox;
