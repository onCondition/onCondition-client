import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import RateForm from "../components/RateForm";
import ContentBoard from "../components/ContentBoard";
import CommentContainer from "../components/CommentContainer";
import Modal from "../components/modalComponent";
import HeartCounter from "../components/HeartCounter";
import Button from "../components/Button";
import DetailWrapper from "../components/DetailWrapper";
import ButtonWrapper from "../components/ButtonsWrapper";

import { getActivityById, editActivityById, deleteActivityById } from "../api/activity";
import { ERROR } from "../constants/messages";
import {
  CANCEL, EDIT, DELETE, SAVE,
} from "../constants/buttons";

const ContentBoardWrapper = styled.div`
  margin: auto;
`;

function activityDetail() {
  const { id, ratingId } = useParams();
  const [activitiesData, setActivityData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [hasModal, setHasModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function loadActivityById(ratingId) {
      const data = await getActivityById(ratingId);
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

    loadActivityById(ratingId);
  }, [ratingId]);

  const handleRedirect = function () {
    history.push("/activity");
  };

  const handleFormSubmit = async function (values) {
    const { heartCount, text } = values;
    const result = await editActivityById(id, ratingId, { heartCount, text });

    setActivityData(values);

    if (result) {
      setIsEditing(false);
    }
  };

  const handleDeletePreConfirm = function () {
    setHasModal(true);
  };

  const handleDeleteButtonClick = async function () {
    const result = await deleteActivityById(id, ratingId);

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
      onClick={handleDeletePreConfirm}
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
      {hasModal && <Modal
        innerText="정말로 삭제하시겠어요?"
        onConfirm={handleDeleteButtonClick}
        onCancel={() => setHasModal(false)}
      />}
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
          <ButtonWrapper isShrink>
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
