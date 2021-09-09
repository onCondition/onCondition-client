import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export default ModalWrapper;
