import React, { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import theme from "../theme/theme";

function Modal() {
  const [modal, setModal] = useState(true);

  function onConfirm() {
    setModal(false);
  }

  function onCancel() {
    setModal(false);
  }

  return (
    <ModalComponent
      modal={modal}
      confirmText="Event"
      cancelText="Cancel"
      innerText="textText"
      onConfirm={onConfirm}
      onCancel={onCancel}
      backgroundColor={theme.mintColors.mainMint}
    />
  );
}

export default Modal;
