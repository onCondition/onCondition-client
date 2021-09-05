import React, { useState } from "react";
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

  ::-webkit-scrollbar {
    width: 5px;
    border: 3px solid transparent;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #B0B0B0;
  }

  ::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 10px;
  }

  ::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 10px;
  }
`;

function CommentForm({ content, onSubmit }) {
  const [comment, setComment] = useState(content);

  function handleSubmit() {
    if (!comment.length) {
      return;
    }

    onSubmit(comment);
  }

  return (
    <div>
      <Form>
        <TextArea
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <div className="align-right">
          <Button
            text="COMMENT"
            onClick={handleSubmit}
          />
        </div>
      </Form>
    </div>
  );
}

CommentForm.propTypes = {
  content: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  content: "",
};

export default CommentForm;
