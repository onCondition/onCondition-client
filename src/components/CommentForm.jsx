import React, { useState, useEffect } from "react";
import Button from "./Button";
import COLORS from "../constants/colors";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.div`
  display: flex;
  margin: 15px 30px;
  flex-direction: column;

  .button {
    display: block;
    margin-top: 5px;
    text-align: right;
  }
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  min-height: 80px;
  padding: 10px;
  border: solid 2px ${COLORS.MAIN_PINK};
  border-radius: 16px;
  resize: none;
  outline: none;
`;

function CommentForm({
  content, buttonText, onSubmit, onReset
}) {
  const [comment, setComment] = useState(content);

  function handleSubmit() {
    if (!comment.length) {
      return;
    }

    onSubmit(comment);
  }

  function handleReset() {
    setComment("");
    onReset();
  }

  useEffect(() => {
    setComment(content);
  }, [content]);

  return (
    <div>
      <Form>
        <TextArea
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          className="transparent-scrollbar"
        />
        <div className="button">
          <Button
            text="RESET"
            onClick={handleReset}
          />
          <Button
            text={buttonText}
            onClick={handleSubmit}
          />
        </div>
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
