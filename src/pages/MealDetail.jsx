import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import firebase from "../config/firebase";
import ButtonsWrapper from "../components/ButtonsWrapper";
import ContentViewer from "../components/ContentViewer";
import ContentForm from "../components/ContentForm";
import Button from "../components/SButton";
import { getMealById, editMealById, deleteMealById } from "../utils/meal";

const ModalTemp = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  opacity: 0.8;
`;

const CommentContainerTemp = styled.div`
  text-align: center;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  .viewer {
    width: 680px;
    text-align: center;
  }

  .comment {
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
    async function setUserUid() {
      const { user } = await firebase.auth().getRedirectResult();
      setUid(user.uid);
    }

    setUserUid();
  });

  useEffect(() => {
    async function loadMealById(mealId) {
      const mealData = await getMealById(mealId);

      setMealData({
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

  const commentElements = comments.map(({ _id, creator, content }) => (
    <li key={_id}>
      {creator.name}: {content}
    </li>
  ));

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
    <ModalTemp>
      {!!mealData
      && <DetailWrapper>
        <div className="viewer">
          {isEditing
            ? <ContentForm
              hasPicture
              isEditForm
              onSubmit={handleFormSubmit}
              submitButtonText="save"
              additionalButton={cancelButton}
              defaultValues={mealData}
            />
            : <>
              <ContentViewer
                hasPicture
                {...mealData}
              />
              {mealData.user.uid === uid
                && <ButtonsWrapper>
                  {editButton}
                  {deleteButton}
                </ButtonsWrapper>}
            </>
          }
        </div>
        <div className="comment">
          {!!comments.length
            && <CommentContainerTemp>
              {commentElements}
            </CommentContainerTemp>
          }
        </div>
      </DetailWrapper>}
    </ModalTemp>
  );
}

export default MealDetail;
