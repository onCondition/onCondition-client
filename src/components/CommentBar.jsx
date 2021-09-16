import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const GridColumn = styled.div`
  display: grid;
  width: calc(100% - 20px);
  margin: 10px auto;
  padding-left: 10px;
  grid-template-columns: 62px auto 50px;
  align-items: center;
  justify-items: center;
`;

const Comment = styled.span`
  align-self: center;
  margin-top: 10px;
  padding: 10px 10px;
  color: ${({ theme }) => theme.background.main};
  text-align: left;
`;

const Image = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 40px;

  @media screen and (max-width: 400px) {
    width: 40px;
    height: 40px;
    padding: 30px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 140px;
  margin-top: 10px;
  justify-items: space-evenly;
  font-size: 0.8rem;
`;

function CommentBar({
  profileUrl,
  name,
  content,
  children,
}) {
  return (
    <GridColumn>
      <Image
        src={profileUrl}
        alt={name}
      />
      <Comment>{content}</Comment>
      <ButtonWrapper>
        {children}
      </ButtonWrapper>
    </GridColumn>
  );
}

CommentBar.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CommentBar;
