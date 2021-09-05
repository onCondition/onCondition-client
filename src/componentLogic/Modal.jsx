import React, { useState } from "react";
import ModalComponent from "../components/modalComponent";

function Modal() {
  const [modal, setModal] = useState(true);

  const onConfirm = () => {
    console.log("확인");
    setModal(false);
  };

  const onCancel = () => {
    console.log("취소");
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
