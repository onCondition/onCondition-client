import React from "react";
import PropTypes from "prop-types";

import theme from "../theme";
import CardContainer from "./CardContainer";
import HeartCounter from "./HeartCounter";
import ProfileImageWrapper from "./ProfileImageWrapper";

function FriendCard({
  profileUrl,
  name,
  lastAccessDate,
  score,
}) {
  return (
    <CardContainer color={theme.background.main}>
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
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number,
  lastAccessDate: PropTypes.string.isRequired,
};

FriendCard.defaultProps = {
  score: 0,
};

export default FriendCard;
