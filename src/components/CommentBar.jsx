import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CommentBarWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: calc(100% - 20px);
  margin: 10px auto;
  padding-left: 10px;
  align-items: center;
`;

const Comment = styled.span`
  align-self: center;
  margin-top: 10px;
  padding: 10px 10px;
  color: ${({ theme }) => theme.background.main};
  text-align: left;

  @media screen and (max-width: 400px) {
    font-size: 0.5rem;
  }
`;

const Image = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;

  @media screen and (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 140px;
  margin-top: 10px;
  justify-items: end;
  font-size: 0.8rem;

  @media screen and (max-width: 400px) {
    button {
      width: 50px;
      font-size: 0.5rem;
    }
  }
`;

function CommentBar({
  profileUrl,
  name,
  content,
  children,
}) {
  function hasValidChildren(children) {
    return children.some((child) => !!child);
  }

  return (
    <CommentBarWrapper>
      <Image
        src={profileUrl}
        alt={name}
      />
      <Comment>{content}</Comment>
      {hasValidChildren(children) && <ButtonWrapper>
        {children}
      </ButtonWrapper>}
    </CommentBarWrapper>
  );
}

CommentBar.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CommentBar;
