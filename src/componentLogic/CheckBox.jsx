import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBoxComponent from "../components/CheckBoxComponent";

function CheckBox({ className, color }) {
  const [checkboxVisibility, setcheckboxVisibility] = useState(false);

  function handleCheckboxChange(ev) {
    setcheckboxVisibility(ev.target.checked);
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
  color: PropTypes.string,
};

export default CheckBox;
