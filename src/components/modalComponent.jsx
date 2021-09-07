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
  z-index: 1;
`;

const OuterModal = styled.div`
  position: absolute;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px black;
  background-color: ${( props ) => props.backgroundColor
    ? props.backgroundColor : props.theme.pinkColors.lightPink};
  border-radius: 10px;
  top: 20vh;
  left: 30vw;
  width: 520px;
  height: 480px;
  padding: 40px 20px;
  margin: -50px;
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-center;
`;

function ModalComponent({
  modalStatus,
  confirmText,
  innerText,
  cancelText,
  onConfirm,
  onCancel,
  backgroundColor,
}) {
  if (!modalStatus) return null;

  return (
    <form>
      <ModalWrapper>
        <OuterModal backgroundColor={backgroundColor}>
          <InnerModal>
            {innerText}
          </InnerModal>
          <ButtonWrapper>
            <Button
              onClick={onConfirm}
              buttonText={confirmText}
              backgroundColor={backgroundColor}
            />
            <Button
              onClick={onCancel}
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
  modalStatus: PropTypes.bool,
  innerText: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  backgroundColor: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

ModalComponent.defaultProps = {
  confirmText: "Confirm",
  cancelText: "Cancel",
};

export default ModalComponent;
