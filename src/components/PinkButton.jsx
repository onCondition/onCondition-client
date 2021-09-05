import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PinkButtonSt = styled.button`
  display: relative;
  border-radius: 10px;
  border: none;
  background-color: rgba(251, 156, 156, 1);
  box-shadow: 5px 5px 10px black;
  color: white;
  cursor: pointer;
  font-size: large;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  margin-top: 15px;
`;

function PinkButton({
  onClickFunction,
  buttonText,
}) {

  return (
    <>
      <PinkButtonSt onClick={onClickFunction}>{buttonText}</PinkButtonSt>
    </>
  );
}

PinkButton.propTypes = {
  buttonText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default PinkButton;
