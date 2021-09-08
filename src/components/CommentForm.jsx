import React, { useState, useEffect } from "react";
import Button from "./Button";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.div`
  display: flex;
  margin: 15px 30px;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  min-height: 80px;
  padding: 10px;
  border: solid 2px ${({ theme }) => theme.pinkColors.mainPink};
  border-radius: 16px;
  resize: none;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 220px;
  margin: 0 0 0 auto;
`;

function CommentForm({
  content, buttonText, onSubmit, onReset,
}) {
  const [comment, setComment] = useState(content);

  const handleSubmit = function () {
    if (!comment.length) {
      return;
    }

    onSubmit(comment);
  };

  const handleReset = function () {
    setComment("");
    onReset();
  };

  useEffect(() => {
    setComment(content);
  }, [content]);

  return (
    <div>
      <Form>
        <TextArea
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <ButtonWrapper>
          <Button
            text="RESET"
            onClick={handleReset}
          />
          <Button
            text={buttonText}
            onClick={handleSubmit}
          />
        </ButtonWrapper>
      </Form>
    </div>
  );
}

CommentForm.propTypes = {
  content: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  content: "",
};

export default CommentForm;