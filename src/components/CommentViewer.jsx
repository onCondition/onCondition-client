import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import CommentBar from "./CommentBar";
import Button from "./Button";
import { EDIT, DELETE } from "../constants/buttons";

const BUTTON_WIDTH = "60px";
const BUTTON_HEIGHT = "30px";

const Wrapper = styled.div`
  overflow: scroll;
`;

function CommentViewer({
  creatorId, comments, onClickEdit, onClickDelete,
}) {
  const user = useSelector((state) => state);

  return (
    <Wrapper>
      {comments.map((comment) => (
        <CommentBar
          key={comment._id}
          name={comment.creator.name}
          profileUrl={comment.creator.profileUrl}
          content={comment.content}
        >
          {(user.id === comment.creator._id || user.id === creatorId) && (
            <div>
              <Button
                text={EDIT}
                onClick={() => onClickEdit({
                  commentId: comment.id, content: comment.content,
                })}
                width={BUTTON_WIDTH}
                height={BUTTON_HEIGHT}
              />
              <Button
                text={DELETE}
                onClick={() => onClickDelete(comment.id)}
                width={BUTTON_WIDTH}
                height={BUTTON_HEIGHT}
              />
            </div>)}
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
