import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";

const ButtonSt = styled.button`
  display: relative;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0 3px 5px ${({ theme }) => theme.shadow.main};
  color: white;
  cursor: pointer;
  font-size: large;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  margin: 0 auto;
  margin-top: 15px;
`;

function Button({
  onClick,
  text,
  backgroundColor,
  width,
  height,
}) {
  return (
    <ButtonSt
      type="button"
      onClick={onClick}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
    >
      {text}
    </ButtonSt>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.oneOf(Object.values(theme.background)),
  height: PropTypes.number,
  width: PropTypes.number,
};

Button.defaultProps = {
  backgroundColor: theme.background.main,
  width: 100,
  height: 50,
};

export default Button;
