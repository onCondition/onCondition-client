import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import CommentEntry from "./CommentEntry";
import CommentForm from "./CommentForm";
import apiRequest from "../utils/axiosInstance";
import { COMMENT, EDIT, DELETE } from "../constants/buttons";
import { ERROR, RESPONSE } from "../constants/messages";
import styled from "styled-components";
import FONTS from "../constants/webFontUrl";
import COLORS from "../constants/colors";

const API_ENDPOINT = "api/comments";

const CommentContainerWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-rows: 6fr 1fr 3fr;
  padding: 10px 5px;
  border-radius: 30px;
  background-color: ${COLORS.LIGHT_GREY};
  box-shadow: 0 0.3rem 0.3rem ${COLORS.DARK_GREY};
`;

const CommentBlock = styled.div`
  overflow: scroll;

  @font-face {
    font-family: "Nanum Gothic", sans-serif;
    src: url(${FONTS.NANUM_GOTHIC});
  }
`;

const Status = styled.div`
  color: ${COLORS.MAIN_PINK};
`;

function CommentContainer({
  userId, category, ratingId, comments
}) {
  const [userComment, setUserComment] = useState({
    id: null, content: "", isUpdated: false,
  });
  const [deleteTargetComment, setDeleteTargetComment] = useState(null);
  const [status, setStatus] = useState("");

  function handleAddComment(newComment) {
    setUserComment((prev) => ({
      ...prev, content: newComment, isUpdated: true
    }));
  }

  function handleOpenEdit({ id, content }) {
    setUserComment({
      id, content, isUpdated: false
    });
  }

  function handleDeleteComment(commentId) {
    setDeleteTargetComment(commentId);
  }

  function resetUserComment() {
    setUserComment({ id: null, content: "", isUpdated: false });
  }

  useEffect(async () => {
    if (!userComment.isUpdated) {
      setStatus("");
      return;
    }

    try {
      const url = API_ENDPOINT
        + (userComment.id ? `/${userComment.id}` : "");
      const request = userComment.id ? apiRequest.patch : apiRequest.post;
      const res = await request(url,
        {
          category,
          ratingId,
          date: new Date(),
          content: userComment.content,
        });

      if (res.status !== RESPONSE.OK) {
        setStatus(ERROR.COMMENT_UPDATE_FAIL);
      }

      resetUserComment();
    } catch {
      setStatus(ERROR.INTERNAL_SERVER_ERROR);
    }
  }, [userComment]);

  useEffect(async () => {
    if (!deleteTargetComment) {
      return;
    }

    try {
      const url = `${API_ENDPOINT}/${deleteTargetComment}`;
      const res = await apiRequest.delete(url);

      if (res.result !== RESPONSE.OK) {
        setStatus(ERROR.COMMENT_DELETE_FAIL);
      }
    } catch {
      setStatus(ERROR.INTERNAL_SERVER_ERROR);
    }
  }, [deleteTargetComment]);

  return (
    <CommentContainerWrapper>
      <CommentBlock className="transparent-scrollbar">
        {comments.map(({
          _id: id, content, profileUrl, creator
        }) => (
          userId === creator ? (
            <CommentEntry
              key={id}
              id={id}
              profileUrl={profileUrl}
              content={content}
            >
              <Button
                text={EDIT}
                onClick={() => handleOpenEdit({ id, content })}
              />
              <Button text={DELETE} onClick={() => handleDeleteComment(id)} />
            </CommentEntry>
          ) : (
            <CommentEntry
              key={id}
              id={id}
              profileUrl={profileUrl}
              content={content}
            />
          )
        ))}
      </CommentBlock>
      <Status>{status}</Status>
      <CommentForm
        content={userComment.content}
        buttonText={userComment.id ? EDIT : COMMENT}
        onSubmit={handleAddComment}
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
