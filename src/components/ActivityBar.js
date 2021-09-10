import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import List from "../components/List";
import HeartCounter from "../components/HeartCounter";
import theme from "../theme";
import { getKoreanTimeString } from "../utils/time";
import { PLUS } from "../constants/buttons";

const RatingOpener = styled.span`
  padding: 0 20px;
  font-size: 24px;
`;

function ActivityBar({ activity, onClickRating }) {
  const {
    _id: id, type, startTime, duration, rating,
  } = activity;

  const handleClickBar = function (ev) {
    if (ev.target.textContent === PLUS) {
      ev.preventDefault();
      onClickRating({
        id, type, startTime, duration, rating,
      });
    }
  };

  return (
    <Link to={`/activity/${id}`} key={id} onClick={handleClickBar}>
      <List color={theme.background.main} key={id}>
        <div>{type}</div>
        <div>{getKoreanTimeString(startTime)}</div>
        <div>{duration} min</div>
        <span>
          {rating?.heartCount ? (
            <HeartCounter count={rating.heartCount || 0} />
          ) : (
            <RatingOpener
              onClick={onClickRating}
            >{PLUS}</RatingOpener>
          )}
        </span>
      </List>
    </Link>
  );
}

ActivityBar.propTypes = {
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      date: PropTypes.string,
      heartCount: PropTypes.number,
      text: PropTypes.string,
    }),
  }),
  onClickRating: PropTypes.func.isRequired,
};

export default ActivityBar;
