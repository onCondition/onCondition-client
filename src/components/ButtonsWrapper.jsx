import styled from "styled-components";

const ButtonsWrapper = styled.div`
  display: flex;
  width: ${(props) => props.isShrink ? "400px" : "630px"};
  margin: 10px auto;

  button {
    flex: 1;
  }
`;

export default ButtonsWrapper;
