import React from "react";
import PropTypes from "prop-types";

import theme from "../theme";
import CardContainer from "./CardContainer";
import HeartCounter from "./HeartCounter";
import ProfileImageWrapper from "./ProfileImageWrapper";

function FriendCard({
  id,
  profileUrl,
  name,
  lastAccessDate,
  scores,
  onClick,
}) {
  const handleCardClick = function () {
    onClick(id);
  };

  const scoresArray = Object.values(scores);
  const score = scoresArray.reduce((sum, score) => sum + score)
    / scoresArray.length;

  return (
    <CardContainer color={theme.background.main} onClick={handleCardClick}>
      <ProfileImageWrapper>
        <img src={profileUrl} alt="profile" />
      </ProfileImageWrapper>
      <p>{name}</p>
      <p>{lastAccessDate}</p>
      <HeartCounter count={score} />
    </CardContainer>
  );
}

FriendCard.propTypes = {
  id: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scores: PropTypes.objectOf(PropTypes.number),
  lastAccessDate: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

FriendCard.defaultProps = {
  score: 0,
};

export default FriendCard;
