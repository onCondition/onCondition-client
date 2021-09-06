import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputSt = styled.input`
  display: relative;
  border-radius: 10px;
  border: 3px solid ${(props) => props.lineColor
    ? props.lineColor : "#FFFFFF"};
  width: 100px;
  height: 50px;
  margin: 0 auto;
  margin-top: 15px;
  outline: none;
`;

function Input({ name, lineColor }) {

  return (
    <InputSt
      name={name}
      lineColor={lineColor}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  lineColor: PropTypes.string,
};

Input.defaultProps = {
  lineColor: "#8AD6CC",
};

export default Input;
