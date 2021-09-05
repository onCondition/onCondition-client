import React, { useState } from "react";
import ModalComponent from "../components/ModalComponent";

function Modal() {
  const [modal, setModal] = useState(true);

  function onConfirm() {
    setModal(false);
  }

  function onCancel() {
    setModal(false);
  }

  return (
    <div>
      <header />
      <ModalComponent
        modal={modal}
        confirmText="Event"
        cancelText="Cancel"
        innerText="아이고어아고"
        onConfirm={onConfirm}
        onCancel={onCancel} />
    </div>
  );
}

export default Modal;
