import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import styled from "styled-components";

const GridColumn = styled.div`
  display: grid;
  margin: 10px;
  grid-template-columns: 62px 5fr 3fr;
  align-items: start;
  justify-items: start;
`;

const Comment = styled.span`
  align-self: center;
  margin-tpp: 10xp;
  padding: 10px 10px;
  color: #FB9C9C;
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
  onEdit,
  onDelete,
}) {
  return (
    <GridColumn>
      <Image
        src={profileUrl}
        alt={creator}
      />
      <Comment>{content}</Comment>
      <ButtonWrapper>
        <Button text="EDIT" onClick={onEdit} />
        <Button text="DELETE" onClick={onDelete} />
      </ButtonWrapper>
    </GridColumn>
  );
}

CommentEntry.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentEntry;
