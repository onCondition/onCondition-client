import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import PropTypes from "prop-types";
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

function FriendDetail({ isRanker }) {
  const history = useHistory();
  const { creatorId, friendId } = useParams();
  const [records, setRecords] = useState(null);
  const [info, setInfo] = useState({
    name: "", stroke: 0, scores: [], lastAccessDate: "", profileUrl: "",
  });
  const [hasModal, setHasModal] = useState(false);

  useEffect(() => {
    async function loadById() {
      const data = await getById(creatorId, friendId);

      if (!data) {
        return;
      }

      const {
        stroke, scores, lastAccessDate, data: records, name, profileUrl,
      } = data;

      setRecords(records);
      setInfo({
        stroke, scores, lastAccessDate, name, profileUrl,
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
          <Button
            type="button"
            text={"block"}
            onClick={handleDeletePreConfirm}
          />
        </CardWrapper>
        <RecordWrapper>
          <div>{isRanker}</div>
        </RecordWrapper>

      </DetailWrapper>
    </ModalWrapper>
  );
}

FriendDetail.propTypes = {
  isRanker: PropTypes.bool,
};

FriendDetail.defaultProps = {
  isRanker: false,
};

export default FriendDetail;
