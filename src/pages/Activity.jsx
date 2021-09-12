import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { PrevButton, NextButton } from "../components/PageButton";
import RateForm from "../components/RateForm";
import ContentBoard from "../components/ContentBoard";
import ActivityBar from "../components/ActivityBar";
import getApi from "../api/category";

const CONTENT_BOARD_PIXEL_WIDTH = 400;
const CONTENT_BOARD_PIXEL_HEIGHT = 150;

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  height: 200px;
  justify-content: center;

  .list {
    flex-grow: 1;
    max-width: 680px;
    margin: 0 10px;
  }

  .viewer {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 500px;
    text-align: center;
    justify-content: space-around;
  }
`;

function Activity() {
  const { creator } = useParams();
  const [activities, setActivities] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { get, editById } = getApi("activity");

  async function loadActivities(page = currentPage) {
    const result = await get(creator, page);

    if (result) {
      const { data, prevPage, nextPage } = result;

      setActivities(data.activities);
      setStepCount(data.stepCount);
      setPrevPage(prevPage);
      setNextPage(nextPage);
      setSelectedActivity(null);
    }
  }

  useEffect(() => {
    loadActivities();
  }, [currentPage]);

  const handleEnableRating = function (activity) {
    setSelectedActivity(activity);
  };

  const handleSubmitForm = async function ({
    date, heartCount, type, text,
  }) {
    const res = await editById(creator, selectedActivity.ratingId, {
      date, type, heartCount, text,
    });

    if (res) {
      setSelectedActivity(null);
      loadActivities(currentPage);
    }
  };

  const handlePrevPageButton = function () {
    setCurrentPage(prevPage);
  };

  const handleNextPageButton = function () {
    setCurrentPage(nextPage);
  };

  const activityBars = (activities.length)
    ? activities.map((activity) => (
      <ActivityBar
        key={activity._id}
        activity={activity}
        onClickRating={handleEnableRating}
      />
    )) : [];

  return (
    <div>
      <h1>운동</h1>
      <Container>
        <div className="viewer">
          <ContentBoard
            text={`${stepCount} STEPS`}
            width={CONTENT_BOARD_PIXEL_WIDTH}
            height={CONTENT_BOARD_PIXEL_HEIGHT}
          >
            <span>Daily Walking</span>
          </ContentBoard>
          {selectedActivity ? (
            <RateForm
              defaultValues={selectedActivity}
              onSubmit={handleSubmitForm}
              submitButtonText="save activity"
            />
          ) : (
            <p>평가를 입력할 세션을 선택해주세요.</p>
          )}
        </div>
        <div className="list">
          {!!prevPage && <PrevButton onClick={handlePrevPageButton} />}
          {activityBars}
          {!!nextPage && <NextButton onClick={handleNextPageButton} />}
        </div>
      </Container>
    </div>
  );
}

export default Activity;
