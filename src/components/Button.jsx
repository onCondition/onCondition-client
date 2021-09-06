import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonSt = styled.button`
  display: relative;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.backgroundColor
    ? props.backgroundColor : "#FFFFFF"};
  box-shadow: 5px 5px 10px black;
  color: white;
  cursor: pointer;
  font-size: large;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  margin-top: 15px;
`;

function Button({
  onChange,
  buttonText,
  backgroundColor,
}) {

  return (
    <ButtonSt
      onClick={onChange}
      backgroundColor={backgroundColor}
    >
      {buttonText}
    </ButtonSt>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  onChange: PropTypes.func,
  backgroundColor: PropTypes.string,
};

export default Button;
