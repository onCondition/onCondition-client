import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const SButton = styled.button`
  background-color: ${props => props.color};
  width: 350px;
  line-height: 2rem;
  border: none;
  border-radius: 30px;
  box-shadow: 0 3px 5px ${({ theme }) => theme.shadow.main};
  color: ${({ theme }) => theme.text.button};
  padding: 0.4rem 0.7rem;
  margin: 4px;
  font-family: "Carrois Gothic SC", sans-serif;

  @font-face {
    font-family: "Carrois Gothic SC", sans-serif;
    src: url("https://fonts.googleapis.com/css2?family=Carrois+Gothic+SC");
  }
`;

function Button({ onClick, text, color }) {
  return (
    <SButton
      type="button"
      onClick={onClick}
      color={color}
    >
      {text}
    </SButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(theme.text)),
};

Button.defaultProps = {
  color: theme.text.main,
};

export default Button;
