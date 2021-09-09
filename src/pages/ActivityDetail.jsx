import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import RateForm from "../components/RateForm";
import ContentBoard from "../components/ContentBoard";
import CommentContainer from "../components/CommentContainer";

import Button from "../components/Button";

import { getActivityById, editActivityById, deleteActivityById } from "../utils/activity";
import { ERROR } from "../constants/messages";
import {
  CANCEL, EDIT, DELETE, SAVE,
} from "../constants/buttons";
import HeartCounter from "../components/HeartCounter";
import DetailWrapper from "../components/DetailWrapper";

const ContentBoardWrapper = styled.div`
  margin: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;

  button {
    flex: 1;
  }
`;

function activityDetail() {
  const { id } = useParams();
  const [activitiesData, setActivityData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function loadActivityById(activitiesId) {
      const data = await getActivityById(activitiesId);
      const {
        comments, startTime: date, duration, type, rating,
      } = data;

      if (rating) {
        const { heartCount, text } = rating;

        setActivityData({
          date, duration, type, heartCount, text,
        });
      } else {
        setActivityData({
          date, duration, type, heartCount: 0, text: "",
        });
      }

      setComments(comments);
    }

    loadActivityById(id);
  }, [id]);

  const handleRedirect = function () {
    history.push("/activity");
  };

  const handleFormSubmit = async function (values) {
    const { heartCount, text } = values;
    const result = await editActivityById(id, { heartCount, text });

    setActivityData(values);

    if (result) {
      setIsEditing(false);
    }
  };

  const handleDeleteButtonClick = async function () {
    const result = await deleteActivityById(id);

    if (result) {
      handleRedirect();
    }
  };

  const cancelButton = (
    <Button
      onClick={() => setIsEditing(false)}
      text={CANCEL}
    />
  );

  const editButton = (
    <Button
      onClick={() => setIsEditing(true)}
      text={EDIT}
    />
  );

  const deleteButton = (
    <Button
      onClick={handleDeleteButtonClick}
      text={DELETE}
    />
  );

  if (!activitiesData) {
    return <p>Loading...</p>;
  }

  const heading = (
    <>
      <p>{activitiesData.date}</p>
      <span>{`${activitiesData.type} (${activitiesData.duration})`}</span>
      <HeartCounter count={activitiesData?.heartCount || 0} />
    </>
  );

  return (
    <DetailWrapper>
      {isEditing
        ? <ContentBoardWrapper>
          <RateForm
            onSubmit={handleFormSubmit}
            submitButtonText={SAVE}
            additionalButton={cancelButton}
            defaultValues={activitiesData}
          />
        </ContentBoardWrapper>
        : <ContentBoardWrapper>
          <ContentBoard
            heading={heading}
            text={activitiesData?.text || ERROR.RATING_TEXT_NOT_EXIST}
            width={400}
            height={240}
          />
          <ButtonWrapper>
            {editButton}
            {deleteButton}
          </ButtonWrapper>
        </ContentBoardWrapper>
      }
      <CommentContainer
        comments={comments}
        ratingId={id}
        category="activity"
      />
    </DetailWrapper>
  );
}

export default activityDetail;
