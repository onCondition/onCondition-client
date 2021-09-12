import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CommentViewer from "./CommentViewer";
import CommentForm from "./CommentForm";
import {
  postComment,
  editCommentById,
  deleteCommentById,
} from "../api/comment";
import { COMMENT, EDIT } from "../constants/buttons";
import { ERROR } from "../constants/messages";

const CommentContainerWrapper = styled.div`
  width: 500px;
  height: 100%;
  display: grid;
  margin: auto;
  grid-template-rows: 6fr 1fr 3fr;
  padding: 10px 5px 5px 5px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.background.comment};
  box-shadow: ${({ theme }) => theme.shadow.main};
`;

const Status = styled.div`
  color: ${({ theme }) => theme.point.main};
`;

function CommentContainer({
  comments, category, ratingId,
}) {
  const [userComment, setUserComment] = useState({
    commentId: "", content: "", isUpdated: false,
  });
  const [targetId, setTargetId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmitComment = function (newComment) {
    setUserComment((prev) => ({
      ...prev, content: newComment, isUpdated: true,
    }));
  };

  const handleClickEdit = function ({ commentId, content }) {
    setUserComment({
      commentId, content, isUpdated: false,
    });
  };

  const resetUserComment = function () {
    setUserComment({ commentId: null, content: "", isUpdated: false });
  };

  const handleClickDelete = function (commentId) {
    setTargetId(commentId);
  };

  useEffect(() => {
    async function updateComment(body) {
      const res = userComment.commentId
        ? await editCommentById(userComment.commentId, body)
        : await postComment(body);

      if (!res) {
        setStatus(ERROR.COMMENT_UPDATE_FAIL);
      } else {
        resetUserComment();
      }
    }

    if (!userComment.isUpdated) {
      setStatus("");

      return;
    }

    const body = {
      category,
      ratingId,
      date: new Date(),
      content: userComment.content,
    };

    updateComment(body);
  }, [userComment]);

  useEffect(() => {
    async function deleteComment() {
      const res = await deleteCommentById(targetId);

      if (!res) {
        setStatus(ERROR.COMMENT_DELETE_FAIL);
      }
    }

    if (!targetId) {
      return;
    }

    deleteComment();
  }, [targetId]);

  return (
    <CommentContainerWrapper>
      <CommentViewer
        comments={comments}
        onClickEdit={handleClickEdit}
        onClickDelete={handleClickDelete}
      />
      <Status>{status}</Status>
      <CommentForm
        content={userComment.content}
        buttonText={userComment.commentId ? EDIT : COMMENT}
        onSubmit={handleSubmitComment}
        onReset={resetUserComment}
      />
    </CommentContainerWrapper>
  );
}

CommentContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ratingId: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profileUrl: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  category: PropTypes.string.isRequired,
  ratingId: PropTypes.string.isRequired,
};

export default CommentContainer;
