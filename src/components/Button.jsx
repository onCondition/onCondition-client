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
  width: ${(props) => props.width
    ? props.width : "100px"};
  height: ${(props) => props.height
    ? props.height : "50px"};
  margin: 0 auto;
  margin-top: 15px;
`;

function Button({
  onClick,
  buttonText,
  backgroundColor,
  width,
  height,
}) {

  return (
    <ButtonSt
      onClick={onClick}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
    >
      {buttonText}
    </ButtonSt>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Button;
