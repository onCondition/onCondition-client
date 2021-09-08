import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const ButtonSt = styled.button`
  display: relative;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 5px 5px 10px ${({ theme }) => theme.greyScaleColors.darkGrey};
  color: ${({ theme }) => theme.innerColors.button};
  font-size: ${({ theme }) => theme.fontSizes.darkGrey};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Button.defaultProps = {
  backgroundColor: theme.pinkColors.lightPink,
  height: "50px",
  width: "100px",
};

export default Button;
