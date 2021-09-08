import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";
import SIZE from "../constants/numbers";

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
  width: ${(props) => props.width
    ? props.width : "520px"};
  height: 480px;
  padding: 40px 20px;
  margin: -50px;
`;

const InnerModal = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.greyScaleColors.fadeWhite};
  border-radius: 10px;
  width: ${(props) => props.width * SIZE.RATIO.MODAL
    ? props.width * SIZE.RATIO.MODAL : "480px"};
  height: 360px;
  margin: auto;
  padding: 40px 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-center;
`;

function ModalComponent({
  confirmText,
  innerText,
  cancelText,
  onConfirm,
  onCancel,
  backgroundColor,
  width,
  height,
}) {
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
              width={width}
              height={height}
            />
            <Button
              onClick={onCancel}
              buttonText={cancelText}
              backgroundColor={backgroundColor}
              width={width}
              height={height}
            />
          </ButtonWrapper>
        </OuterModal>
      </ModalWrapper>
    </form>
  );
}

ModalComponent.propTypes = {
  innerText: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  backgroundColor: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
};

ModalComponent.defaultProps = {
  confirmText: "Confirm",
  cancelText: "Cancel",
};

export default ModalComponent;
