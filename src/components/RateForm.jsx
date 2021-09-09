import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import HeartInput from "./HeartInput";
import ButtonsWrapper from "./ButtonsWrapper";
import Button from "./Button";
import theme from "../theme";

const Textarea = styled.textarea`
  flex-grow: 1;
  margin: 5px 20px 20px 20px;
  padding: 5px 15px;
  line-height: 2rem;
  border-radius: 7px;
  border-style: hidden;
  background: ${({ theme }) => theme.greyScaleColors.white};
  color: ${({ theme }) => theme.greyScaleColors.black};
  text-align: left;
  resize: none;

  :focus {
    outline: none;
  }
`;

function RateForm({
  color,
  onSubmit,
  submitButtonText,
  additionalButton,
  defaultValues,
}) {
  const [heartCount, setHeartCount] = useState(defaultValues.heartCount);
  const [text, setText] = useState(defaultValues.text);
  const { startTime, duration, type } = defaultValues;

  const handleCountChange = function (value) {
    setHeartCount(value);
  };

  const handleTextChange = function ({ target }) {
    setText(target.value);
  };

  const handleSubmitButton = function () {
    onSubmit({ heartCount, text });
  };

  return (
    <form>
      <Wrapper color={color} isShrink>
        <div>
          <p>{startTime.toLocaleString()}</p>
          <span>{`${type} (${duration})`}</span>
          <HeartInput count={heartCount} onChange={handleCountChange}/>
        </div>
        <Textarea
          placeholder="내용을 입력해주세요"
          value={text}
          onChange={handleTextChange}
          disabled={defaultValues.heartCount}
        />
      </Wrapper>
      <ButtonsWrapper isShrink>
        <Button text={submitButtonText} onClick={handleSubmitButton} />
        {additionalButton}
      </ButtonsWrapper>
    </form>
  );
}

RateForm.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  additionalButton: PropTypes.element,
  defaultValues: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    type: PropTypes.string,
    heartCount: PropTypes.number,
    text: PropTypes.string,
    date: PropTypes.string,
  }),
};

RateForm.defaultProps = {
  color: theme.background.main,
  hasPicture: false,
  defaultValues: {
    heartCount: 0,
    date: new Date(),
    text: "",
    type: "",
  },
};

export default RateForm;
