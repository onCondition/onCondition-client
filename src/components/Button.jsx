import React from "react";
import PropTypes from "prop-types";
import FONTS from "../constants/webFontUrl";
import styled from "styled-components";
import COLORS from "../constants/colors";

const SButton = styled.button`
  padding: 0.4rem 0.7rem;
  margin: 4px;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  border-radius: 30px;
  color: ${(props) => props.color};

  :hover {
    cursor: pointer;
  }

  @font-face {
    font-family: "Carrois Gothic SC", sans-serif;
    src: url(${FONTS.CARROIS_GOTHIC_SC});
  }
`;

function Button({
  onClick, text, color, backgroundColor
}) {
  return (
    <SButton
      type="button"
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
    >
      {text}
    </SButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  color: COLORS.WHITE,
  backgroundColor: COLORS.LIGHT_PINK,
};

export default Button;
