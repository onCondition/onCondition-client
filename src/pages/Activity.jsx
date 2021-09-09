import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PrevButton, NextButton } from "../components/PageButton";
import RateForm from "../components/RateForm";
import ContentBoard from "../components/ContentBoard";
import ActivityBar from "../components/ActivityBar";
import { getActivities, editActivityById } from "../utils/activity";

const CONTENT_BOARD_PIXEL_WIDTH = 630;
const CONTENT_BOARD_PIXEL_HEIGHT = 150;

const Title = styled.p`
  margin: 10px 0px 10px 30px;
  color: ${({ theme }) => theme.mintColors.mainMint};
  text-align: left;
  font-size: 50px;
`;

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
  const [activities, setActivities] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  async function loadActivities(page = currentPage) {
    const result = await getActivities(page);

    if (result) {
      setActivities(result.activities);
      setStepCount(result.stepCount);
      setPrevPage(result.prevPage);
      setNextPage(result.nextPage);
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
    const res = await editActivityById(selectedActivity.id, {
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
      <Title>운동</Title>
      <Container>
        <div className="viewer">
          <ContentBoard
            heading="Daily Walking"
            text={`${stepCount} STEPS`}
            width={CONTENT_BOARD_PIXEL_WIDTH}
            height={CONTENT_BOARD_PIXEL_HEIGHT}
          />
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
