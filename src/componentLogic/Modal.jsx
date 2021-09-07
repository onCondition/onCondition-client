import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalComponent from "../components/modalComponent";

function Modal({
  confirmText,
  innerText,
  backgroundColor,
}) {
  const [modal, setModal] = useState(true);

  function handleConfirm() {
    console.log("OK I'm working");
  }

  function handleCancel() {
    setModal(false);
  }

  return (
    <ModalComponent
      modal={modal}
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
