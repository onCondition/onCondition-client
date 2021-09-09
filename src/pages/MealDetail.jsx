import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import firebase from "../config/firebase";
import ModalWrapper from "../components/ModalWrapper";
import ButtonsWrapper from "../components/ButtonsWrapper";
import ContentViewer from "../components/ContentViewer";
import ContentForm from "../components/ContentForm";
import CommentContainer from "../components/CommentContainer";
import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import theme from "../theme";
import { getMealById, editMealById, deleteMealById } from "../utils/meal";

const DetailWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.background.input};
  border: 3px solid ${({ theme }) => theme.background.main};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.main};

  .viewer {
    width: 680px;
    text-align: center;
  }

  .comment {
    margin-right: 20px;
    flex-basis: 200px;
    flex-grow: 1;
  }
`;

function MealDetail() {
  const { id } = useParams();
  const [uid, setUid] = useState("");
  const [mealData, setMealData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUid(user.uid);
  });

  useEffect(() => {
    async function loadMealById(mealId) {
      const mealData = await getMealById(mealId);

      setMealData({
        creator: mealData.creator,
        date: mealData.date,
        url: mealData.url,
        heartCount: mealData.rating.heartCount,
        text: mealData.rating.text,
      });

      setComments(mealData.comments);
    }

    loadMealById(id);
  }, [id]);

  const handleFormSubmit = async function (values) {
    const { date, heartCount, text } = values;

    const result = await editMealById(id, {
      date,
      heartCount,
      text,
    });

    setMealData(values);

    if (result) {
      setIsEditing(false);
    }
  };

  const handleDeleteButtonClick = async function () {
    const result = await deleteMealById(id);

    if (result) {
      history.push("/meal");
    }
  };

  const handleCloseButtonClick = function () {
    history.push("/meal");
  };

  const cancelButton = (
    <Button
      onClick={() => setIsEditing(false)}
      text="cancel"
    />
  );

  const editButton = (
    <Button
      onClick={() => setIsEditing(true)}
      text="edit"
    />
  );

  const deleteButton = (
    <Button
      onClick={handleDeleteButtonClick}
      text="delete"
    />
  );

  return (
    <ModalWrapper>
      <CircleButton
        color={theme.background.main}
        onClick={handleCloseButtonClick}
      >x</CircleButton>
      {!!mealData
      && <DetailWrapper>
        <div className="viewer">
          {isEditing
            ? <ContentForm
              isEditForm
              onSubmit={handleFormSubmit}
              submitButtonText="save"
              additionalButton={cancelButton}
              defaultValues={mealData}
            />
            : <>
              <ContentViewer
                {...mealData}
              />
              <ButtonsWrapper>
                {editButton}
                {deleteButton}
              </ButtonsWrapper>
            </>
          }
        </div>
        <div className="comment">
          <CommentContainer comments={comments} userId={uid} />
        </div>
      </DetailWrapper>}
    </ModalWrapper>
  );
}

export default MealDetail;
