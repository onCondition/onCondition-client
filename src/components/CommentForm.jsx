import React, { useState, useEffect } from "react";
import Button from "./Button";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.div`
  margin: 20px;

  .align-right {
    text-align: right;
    margin-right: 20px;
  }
`;

const TextArea = styled.textarea`
  width: 380px;
  height: 60px;
  padding: 10px;
  border: solid 2px #F97171;
  border-radius: 16px;
  resize: none;
  outline: none;
  font-family: "Nanum Gothic", sans-serif;
`;

function CommentForm({ content, buttonText, onSubmit }) {
  const [comment, setComment] = useState(content);

  function handleSubmit() {
    if (!comment.length) {
      return;
    }

    onSubmit(comment);
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
        <div className="align-right">
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
};

CommentForm.defaultProps = {
  content: "",
};

export default CommentForm;
