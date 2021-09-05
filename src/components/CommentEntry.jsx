import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import COLORS from "../constants/colors";

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
  color: ${COLORS.LIGHT_PINK};
  text-align: left;
  font-family: "Nanum Gothic", sans-serif;

  @font-face {
    font-family: "Nanum Gothic", sans-serif;
    src: url("https://fonts.googleapis.com/css2?family=Nanum+Gothic");
  }
`;

const Image = styled.img`
  width: 41px;
  height: 41px;
  border-radius: 40px;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

function CommentEntry({
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

CommentEntry.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CommentEntry;
