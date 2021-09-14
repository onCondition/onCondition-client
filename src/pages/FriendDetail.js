import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Radar } from "react-chartjs-2";
import styled from "styled-components";

import Modal from "../components/modalComponent";
import ModalWrapper from "../components/ModalWrapper";
import DetailWrapper from "../components/DetailWrapper";

import FriendCard from "../components/FriendCard";
import ContentBar from "../components/ContentBar";

import Button from "../components/Button";
import CircleButton from "../components/CircleButton";
import theme from "../theme";
import { radarDefaultOptions } from "../config/graphOption";

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
  const [records, setRecords] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    scores: {},
    lastAccessDate: "",
    profileUrl: "",
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

      setRecords(records);
      setInfo({
        scores, lastAccessDate, name, profileUrl,
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

  if (!records) {
    return <p>Loading...</p>;
  }

  const recordBars = records.map((record) => <ContentBar
    key={record._id}
    creatorId={friendId}
    category={record.category}
    content={record}
    color={theme.background.sub}
  />);

  const radarOptions = {
    ...radarDefaultOptions,
    scales: {
      r: {
        ...radarDefaultOptions.scales.r,
        ticks: {
          display: false,
          stepSize: 2,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const data = { labels: Object.keys(info.scores),
    datasets: [{ data: Object.values(info.scores) }] };

  const graph = <div className="graph">
    <Radar
      data={data}
      options={radarOptions}
    />
  </div>;

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
            <div className="card">
              {isBackSide ? <FriendCard
                profileUrl={info.profileUrl}
                color={theme.background.sub}
                graph={graph}
                name={info.name}
                lastAccessDate={info.lastAccessDate}
                scores={info.scores}
                onClick={handleCardClick}
              />
                : <FriendCard
                  profileUrl={info.profileUrl}
                  name={info.name}
                  lastAccessDate={info.lastAccessDate}
                  scores={info.scores}
                  onClick={handleCardClick}
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
