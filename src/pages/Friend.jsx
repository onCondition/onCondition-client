import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import { getFriends, updateFriendRequest } from "../api/friend";
import FriendCard from "../components/FriendCard";
import PendingFriendCard from "../components/PendingFriendCard";
import AddFriendCard from "../components/AddFriendCard";

const FriendWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, auto));
  gap: ${({ theme }) => theme.gaps.medium};
  justify-content: center;
  padding: 10px;
`;

function Friend() {
  const { creatorId } = useParams();
  const [friends, setFriends] = useState([]);
  const [sendingRequest, setSendingRequest] = useState([]);
  const [receivingRequest, setReceivingRequest] = useState([]);

  const history = useHistory();

  async function loadFriends() {
    const {
      friends,
      sendingRequest,
      receivingRequest,
    } = await getFriends(creatorId);

    setFriends(friends);
    setSendingRequest(sendingRequest);
    setReceivingRequest(receivingRequest);
  }

  useEffect(() => {
    loadFriends();
  }, [creatorId]);

  const handleAccept = async function (friendId) {
    const result = await updateFriendRequest(creatorId, friendId, true);

    if (result) {
      loadFriends();
    }
  };

  const handleDeny = async function (friendId) {
    const result = await updateFriendRequest(creatorId, friendId, false);

    if (result) {
      loadFriends();
    }
  };

  const handleFriendClick = function (friendId) {
    history.push(`${friendId}`);
  };

  const pendingCardsReceiving = receivingRequest.map(({
    _id,
    profileUrl,
    name,
  }) => (
    <PendingFriendCard
      key={_id}
      id={_id}
      profileUrl={profileUrl}
      onAcceptButtonClick={handleAccept}
      onDenyButtonClick={handleDeny}
      name={name}
    />
  ));

  const profileCards = friends.map(({
    _id,
    profileUrl,
    name,
    score,
    lastAccessData,
  }) => (
    <FriendCard
      key={_id}
      id={_id}
      profileUrl={profileUrl}
      name={name}
      lastAccessDate={lastAccessData}
      score={score}
      onClick={handleFriendClick}
    />
  ));

  const pendingCardsSending = sendingRequest.map(({
    _id,
    profileUrl,
    name,
  }) => (
    <PendingFriendCard
      key={_id}
      id={_id}
      profileUrl={profileUrl}
      name={name}
      isSent
    />
  ));

  const handleAddFriend = function () {
    history.push("new");
  };

  return (
    <div>
      <h1>친구</h1>
      <FriendWrapper>
        <AddFriendCard onClick={handleAddFriend}/>
        {pendingCardsReceiving}
        {profileCards}
        {pendingCardsSending}
      </FriendWrapper>
    </div>
  );
}

export default Friend;
