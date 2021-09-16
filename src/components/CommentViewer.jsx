import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import CommentBar from "./CommentBar";
import Button from "./Button";
import { EDIT, DELETE } from "../constants/buttons";

const BUTTON_WIDTH = 80;
const BUTTON_HEIGHT = 30;

const Wrapper = styled.div`
  overflow: scroll;
`;

function CommentViewer({
  creatorId, comments, onClickEdit, onClickDelete,
}) {
  const user = useSelector((state) => state.user);
  const isCreator = user.id === creatorId;

  if (!comments) {
    return null;
  }

  return (
    <Wrapper>
      {comments.map((comment) => (
        <CommentBar
          key={comment._id}
          name={comment.creator.name}
          profileUrl={comment.creator.profileUrl}
          content={comment.content}
        >
          <span>
            {(user.id === comment.creator._id) && <Button
              text={EDIT}
              onClick={() => onClickEdit({
                commentId: comment._id, content: comment.content,
              })}
              width={BUTTON_WIDTH}
              height={BUTTON_HEIGHT}
            />}
            {(user.id === comment.creator._id || isCreator) && <Button
              text={DELETE}
              onClick={() => onClickDelete(comment._id)}
              width={BUTTON_WIDTH}
              height={BUTTON_HEIGHT}
            />}
          </span>
        </CommentBar>
      ))}
    </Wrapper>
  );
}

CommentViewer.propTypes = {
  creatorId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ratingId: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileUrl: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default CommentViewer;
