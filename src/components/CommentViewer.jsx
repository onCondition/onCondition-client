import React from "react";
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
  userId, comments, onClickEdit, onClickDelete,
}) {
  return (
    <Wrapper>
      {comments.map(({
        _id: id, content, profileUrl, creator,
      }) => (
        userId === creator ? (
          <CommentBar
            key={id}
            id={id}
            profileUrl={profileUrl}
            content={content}
          >
            <Button
              text={EDIT}
              onClick={() => onClickEdit({ id, content })}
              width={BUTTON_WIDTH}
              height={BUTTON_HEIGHT}
            />
            <Button
              text={DELETE}
              onClick={() => onClickDelete(id)}
              width={BUTTON_WIDTH}
              height={BUTTON_HEIGHT}
            />
          </CommentBar>
        ) : (
          <CommentBar
            key={id}
            id={id}
            profileUrl={profileUrl}
            content={content}
          />
        )
      ))}
    </Wrapper>
  );
}

CommentViewer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ratingId: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  userId: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default CommentViewer;