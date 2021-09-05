import React, { useState } from "react";
import ModalComponent from "../components/modalComponent";

function Modal() {
  const [modal, setModal] = useState(true);

  const onConfirm = () => {
    setModal(false);
  };

  const onCancel = () => {
    setModal(false);
  };

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
