import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalComponent from "../components/modalComponent";

function Modal({
  confirmText,
  innerText,
  backgroundColor,
}) {
  const [isModalOn, setIsModalOn] = useState(true);

  function handleConfirm() {
    console.log("OK I'm working");
  }

  function handleCancel() {
    setIsModalOn(false);
  }

  return (
    <ModalComponent
      modalStatus={isModalOn}
      confirmText={confirmText}
      cancelText="Cancel"
      innerText={innerText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      backgroundColor={backgroundColor}
    />
  );
}

Modal.propTypes = {
  innerText: PropTypes.string,
  confirmText: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Modal.defaultProps = {
  innerText: "Text",
  confirmText: "Confirm",
};

export default Modal;
