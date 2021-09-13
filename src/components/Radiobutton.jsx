import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const ColorSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 25px;
  margin: auto;
  padding: 4px;
  border: 5px solid ${(props) => props.color};
  border-radius: 40px;
`;

const Label = styled.label`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
`;

const RadioButton = styled.input`
  display: none;
  &: checked + ${Label} {
    background: ${(props) => props.color};
  }
`;

function Radiobutton({
  id,
  value,
  color,
}) {
  return (
    <ColorSelectorContainer color={color}>
      <RadioButton
        id={id}
        type="radio"
        value={value}
        color={color}
      />
      <Label
        htmlFor={id}
        value={value}
      />
    </ColorSelectorContainer>
  );
}

Radiobutton.propTypes = {
  value: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
};

Radiobutton.defaultProps = {
  color: theme.background.sub,
};

export default Radiobutton;
