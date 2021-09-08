import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const GridColumn = styled.div`
  display: grid;
  margin: 10px;
  grid-template-columns: 62px auto 150px;
  align-items: start;
  justify-items: start;
`;

const Comment = styled.span`
  align-self: center;
  margin-tpp: 10xp;
  padding: 10px 10px;
  color: ${({ theme }) => theme.pinkColors.mainPink};
  text-align: left;
`;

const Image = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 40px;
  padding: 10px;
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
  creator,
  content,
  children,
}) {
  return (
    <GridColumn>
      <Image
        src={profileUrl}
        alt={creator}
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
  creator: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CommentBar;
