import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SButton = styled.button`
  background-color: ${props => props.color};
  width: 350px;
  line-height: 2rem;
  border: none;
  border-radius: 30px;
  box-shadow: 0 3px 5px gray;
  color: white;
  padding: 0.4rem 0.7rem;
  margin: 4px;
  font-family: "Carrois Gothic SC", sans-serif;

  @font-face {
    font-family: "Carrois Gothic SC", sans-serif;
    src: url("https://fonts.googleapis.com/css2?family=Carrois+Gothic+SC");
  }
`;

function Button({ onClick, text, color }) {
  const COLORS = {
    mint: "#8AD6CC",
    coral: "#FB9C9C",
  };

  return (
    <SButton
      type="button"
      onClick={onClick}
      color={COLORS[color]}
    >
      {text}
    </SButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["mint", "coral"]),
};

Button.defaultProps = {
  color: "coral",
};

export default Button;
