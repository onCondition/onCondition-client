import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import HeartCounter from "./HeartCounter";

const HeartInputWrapper = styled.div`
  display: inline-flex;
  width: 90px;
  flex-direction: column;
  align-items: center;

  input {
    width: 80px;
    -webkit-appearance: none;
  }

  input::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: pointer;
    background: ${({ theme }) => theme.greyScaleColors.darkGrey};
  }

  input::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    margin-top: -1px;
  }
`;

function HeartInput({ count, onChange }) {
  const handleCountChange = function ({ target }) {
    onChange(Number(target.value));
  };

  return (
    <span>
      <HeartInputWrapper>
        <HeartCounter count={count} />
        <input
          type="range"
          name="heartCount"
          min="0"
          max="10"
          value={count}
          onChange={handleCountChange}
        />
      </HeartInputWrapper>
    </span>
  );
}

HeartInput.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func,
};

export default HeartInput;
