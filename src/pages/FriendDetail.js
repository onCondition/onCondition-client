import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import Modal from "../components/modalComponent";
import ModalWrapper from "../components/ModalWrapper";
import DetailWrapper from "../components/DetailWrapper";

import FriendCard from "../components/FriendCard";

import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import theme from "../theme";

import { getById, deleteById } from "../api/friends";

const CardWrapper = styled.div`
  display: grid;
`;

const RecordWrapper = styled.div`
  display: flex;
`;

function FriendDetail() {
  const history = useHistory();
  const { creatorId, friendId } = useParams();
  const [records, setRecords] = useState(null);
  const [info, setInfo] = useState({
    name: "", scores: null, lastAccessDate: "", profileUrl: "", score: 0,
  });
  const [hasModal, setHasModal] = useState(false);

  useEffect(() => {
    async function loadById() {
      const data = await getById(creatorId, friendId);

      if (!data) {
        return;
      }

      const {
        scores, lastAccessDate, data: records, name, profileUrl,
      } = data;

      const score = scores.length
        ? Object.values(scores).reduce((sum, el) => sum + el) / scores.length
        : 0;

      setRecords(records);
      setInfo({
        scores, lastAccessDate, name, profileUrl, score,
      });
    }

    loadById();
  }, [creatorId, friendId]);

  const handleRedirect = function () {
    history.push(`/${creatorId}/friends`);
  };

  const handleDeleteButtonClick = async function () {
    const result = await deleteById(creatorId, friendId);

    if (result) {
      handleRedirect();
    }
  };

  const handleCloseButtonClick = function () {
    handleRedirect();
  };

  const handleDeletePreConfirm = function () {
    setHasModal(true);
  };

  const deleteButton = (
    <Button
      onClick={handleDeletePreConfirm}
      text={"block"}
    />
  );

  if (!records) {
    return <p>Loading...</p>;
  }

  return (
    <ModalWrapper>
      {hasModal && <Modal
        innerText="정말로 차단하시겠어요?"
        onConfirm={handleDeleteButtonClick}
        onCancel={() => setHasModal(false)}
      />}
      <CircleButton
        color={theme.background.main}
        onClick={handleCloseButtonClick}
      >x</CircleButton>
      <DetailWrapper>
        <CardWrapper>
          <FriendCard
            profileUrl={info.profileUrl}
            name={info.name}
            lastAccessDate={info.lastAccessDate}
            score={info.score}
          />
          {deleteButton}
        </CardWrapper>
        <RecordWrapper>
          <div>Record</div>
        </RecordWrapper>

      </DetailWrapper>
    </ModalWrapper>
  );
}

export default FriendDetail;
