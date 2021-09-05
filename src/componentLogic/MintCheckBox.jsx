import React, { useState } from "react";
import PropTypes from "prop-types";
import MintCheckBoxComponent from "../components/MintCheckBoxComponent";

function MintCheckBox({ className }) {
  const [checkboxVisibility, setcheckboxVisibility] = useState(false);

  function handleCheckboxChange(ev) {
    setcheckboxVisibility(ev.target.checked);
  }

  return (
    <MintCheckBoxComponent
      className={className}
      onChange={handleCheckboxChange}
      checked={checkboxVisibility}
    />
  );
}

MintCheckBox.propTypes = {
  className: PropTypes.string,
  checkboxVisibility: PropTypes.bool,
};

export default MintCheckBox;
