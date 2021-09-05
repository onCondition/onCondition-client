import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const MintButtonSt = styled.button`
  display: relative;
  border-radius: 10px;
  border: none;
  background-color: rgba(138, 214, 204, 0.9);
  box-shadow: 5px 5px 10px black;
  color: white;
  cursor: pointer;
  font-size: large;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  margin-top: 15px;
`;

function MintButton({
  onClickFunction,
  buttonText,
}) {

  return (
    <>
      <MintButtonSt onClick={onClickFunction}>{buttonText}</MintButtonSt>
    </>
  );
}

MintButton.propTypes = {
  buttonText: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default MintButton;
