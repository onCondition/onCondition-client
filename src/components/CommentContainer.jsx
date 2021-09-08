import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CommentViewer from "./CommentViewer";
import CommentForm from "./CommentForm";
import {
  postComment,
  editCommentById,
  deleteCommentById,
} from "../utils/comment";
import { COMMENT, EDIT } from "../constants/buttons";
import { ERROR } from "../constants/messages";

const CommentContainerWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-rows: 6fr 1fr 3fr;
  padding: 10px 5px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.greyScaleColors.lightGrey};
  box-shadow: 0 0.3rem 0.3rem ${({ theme }) => theme.greyScaleColors.darkGrey};
`;

const Status = styled.div`
  color: ${({ theme }) => theme.pinkColors.mainPink};
`;

function CommentContainer({
  comments, userId, category, ratingId,
}) {
  const [userComment, setUserComment] = useState({
    id: "", content: "", isUpdated: false,
  });
  const [targetId, setTargetId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmitComment = function (newComment) {
    setUserComment((prev) => ({
      ...prev, content: newComment, isUpdated: true,
    }));
  };

  const handleClickEdit = function ({ id, content }) {
    setUserComment({
      id, content, isUpdated: false,
    });
  };

  const resetUserComment = function () {
    setUserComment({ id: null, content: "", isUpdated: false });
  };

  const handleClickDelete = function (id) {
    setTargetId(id);
  };

  useEffect(async () => {
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
    const res = userComment.id
      ? await editCommentById(userComment.id, body)
      : await postComment(body);

    if (!res) {
      setStatus(ERROR.COMMENT_UPDATE_FAIL);
    } else {
      resetUserComment();
    }
  }, [userComment]);

  useEffect(async () => {
    if (!targetId) {
      return;
    }

    const res = await deleteCommentById(targetId);

    if (!res) {
      setStatus(ERROR.COMMENT_DELETE_FAIL);
    }
  }, [targetId]);

  return (
    <CommentContainerWrapper>
      <CommentViewer
        userId={userId}
        comments={comments}
        onClickEdit={handleClickEdit}
        onClickDelete={handleClickDelete}
      />
      <Status>{status}</Status>
      <CommentForm
        content={userComment.content}
        buttonText={userComment.id ? EDIT : COMMENT}
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
    creator: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  userId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ratingId: PropTypes.string.isRequired,
};

export default CommentContainer;
