import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Radar } from "react-chartjs-2";
import styled from "styled-components";

import Modal from "../components/modalComponent";
import ModalWrapper from "../components/ModalWrapper";
import DetailWrapper from "../components/DetailWrapper";

import FriendCard from "../components/FriendCard";
import CardContainer from "../components/CardContainer";
import ContentBar from "../components/ContentBar";

import HeartCounter from "../components/HeartCounter";
import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import theme from "../theme";

import { getById, deleteById } from "../api/friend";

const Layout = styled.div`
  display: grid;
  height: 90vh;
  width: 90vw;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  margin: auto;

  .card-area {
    display: grid;
    margin: auto;
    cursor: pointer;
  }
`;

const RecentRecordContainer = styled.div`
  display: grid;
  height: 90vh;
  margin: 20px;
`;

const RecordsWrapper = styled.div`
  margin: 20px;
  overflow: scroll;
`;

function FriendDetail() {
  const history = useHistory();
  const { creatorId, friendId } = useParams();
  const [records, setRecords] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    scores: null,
    lastAccessDate: "",
    profileUrl: "",
    score: 0,
    scoreCategories: [],
    scoreValues: [],
  });
  const [isBackSide, setIsBackSide] = useState(false);
  const [hasModal, setHasModal] = useState(false);

  useEffect(() => {
    async function loadById() {
      const data = await getById(creatorId, friendId);

      if (!data) {
        return;
      }

      const {
        data: records, scores, lastAccessDate, name, profileUrl,
      } = data;

      const scoreCategories = Object.keys(records);
      const scoreValues = scoreCategories.map((key) => scoreCategories[key]);
      const score = scoreValues.length
        ? scoreValues.reduce((sum, el) => sum + el) / scoreValues.length
        : 0;

      setRecords(records);
      setInfo({
        scores,
        lastAccessDate,
        name,
        profileUrl,
        score,
        scoreCategories,
        scoreValues,
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

  const handleCardClick = function () {
    setIsBackSide((prevState) => !prevState);
  };

  const deleteButton = (
    <Button
      onClick={handleDeletePreConfirm}
      text={"block"}
    />
  );

  const recordBars = records.map((record) => <ContentBar
    key={record._id}
    creatorId={friendId}
    category={record.category}
    content={record}
    color={theme.background.sub}
  />);

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
        <Layout>
          <div className="card-area">
            <div className="card" onClick={handleCardClick}>
              {isBackSide ? <CardContainer color={theme.background.sub}>
                <Radar
                  data={info.scoreValues}
                  options={info.scoreCategories}
                />
                <p>{info.name}</p>
                <p>{info.lastAccessDate}</p>
                <HeartCounter count={info.score} />
              </CardContainer>
                : <FriendCard
                  profileUrl={info.profileUrl}
                  name={info.name}
                  lastAccessDate={info.lastAccessDate}
                  score={info.score}
                />}
            </div>
            {deleteButton}
          </div>
          <RecentRecordContainer>
            <h5>최근 활동</h5>
            <RecordsWrapper>
              {recordBars}
            </RecordsWrapper>
          </RecentRecordContainer>
        </Layout>
      </DetailWrapper>
    </ModalWrapper>
  );
}

export default FriendDetail;
