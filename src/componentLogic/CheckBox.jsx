import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBoxComponent from "../components/CheckBoxComponent";

function CheckBox({ className }) {
  const [checkboxVisibility, setcheckboxVisibility] = useState(false);

  function handleCheckboxChange(ev) {
    setcheckboxVisibility(ev.target.checked);
  }

  return (
    <CheckBoxComponent
      className={className}
      onChange={handleCheckboxChange}
      checked={checkboxVisibility}
    />
  );
}

CheckBox.propTypes = {
  className: PropTypes.string,
};

export default CheckBox;
