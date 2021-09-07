import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputSt = styled.input`
  display: relative;
  border-radius: 10px;
  border: 3px solid ${(props) => props.lineColor
    ? props.lineColor : props.theme.pinkColors.mainPink};
  width: ${(props) => props.width
    ? props.width : "150px"};
  height: ${(props) => props.height
    ? props.height : "50px"};
  margin: 0 auto;
  margin-top: 15px;
  outline: none;
`;

function Input({
  name,
  lineColor,
  width,
  height,
}) {

  return (
    <InputSt
      name={name}
      lineColor={lineColor}
      width={width}
      height={height}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  lineColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Input;
