import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const MintInputSt = styled.input`
  display: relative;
  border-radius: 10px;
  border: 3px solid rgba(138, 214, 204, 1);
  width: 100px;
  height: 50px;
  margin: 0 auto;
  margin-top: 15px;
  outline: none;
`;

function MintInput({ name }) {

  return (
    <MintInputSt name={name} />
  );
}

MintInput.propTypes = {
  name: PropTypes.string,
};

export default MintInput;
