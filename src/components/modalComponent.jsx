import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";

const ModalWrapper = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const OuterModal = styled.div`
  position: absolute;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px black;
  background-color: ${(props) => props.backgroundColor
    ? props.backgroundColor : "#FFFFFF"};
  border-radius: 10px;
  top: calc(20vh);
  left: calc(30vw);
  width: 520px;
  height: 480px;
  padding: 40px 20px;
  margin: -50px;
  z-index: 100;
`;

const InnerModal = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  width: 460px;
  height: 360px;
  margin: auto;
  padding: 40px 20px;
  z-index: 10;
`;

const ButtonWrapper = styled.div`
  display: flex;
  z-index: 10;
  justify-content: space-center;
`;

function ModalComponent({
  modal,
  innerText,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  backgroundColor,
}) {
  if (!modal) return null;

  return (
    <form>
      <ModalWrapper>
        <OuterModal backgroundColor={backgroundColor}>
          <InnerModal>
            {innerText}
          </InnerModal>
          <ButtonWrapper>
            <Button
              onClickFunction={onConfirm}
              buttonText={confirmText}
              backgroundColor={backgroundColor}
            />
            <Button
              onClickFunction={onCancel}
              buttonText={cancelText}
              backgroundColor={backgroundColor}
            />
          </ButtonWrapper>
        </OuterModal>
      </ModalWrapper>
    </form>
  );
}

ModalComponent.propTypes = {
  modal: PropTypes.bool,
  innerText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  backgroundColor: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

ModalComponent.defaultProps = {
  innerText: "Text",
  confirmText: "Confirm",
  cancelText: "Cancel",
};

export default ModalComponent;
