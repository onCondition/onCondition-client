import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalComponent from "../components/modalComponent";

function Modal({
  confirmText,
  innerText,
  backgroundColor,
  width,
  height,
}) {
  const [isModalOn, setIsModalOn] = useState(true);

  function handleConfirm() {
    //
  }

  function handleCancel() {
    setIsModalOn(false);
  }

  return (
    <>
      {isModalOn && <ModalComponent
        modalStatus={isModalOn}
        confirmText={confirmText}
        cancelText="Cancel"
        innerText={innerText}
        width={width}
        height={height}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        backgroundColor={backgroundColor}/>
      }
    </>
  );
}

Modal.propTypes = {
  innerText: PropTypes.string,
  confirmText: PropTypes.string,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Modal.defaultProps = {
  innerText: "Text",
  confirmText: "Confirm",
};

export default Modal;
