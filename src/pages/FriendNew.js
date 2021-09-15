import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import styled from "styled-components";

import ContentBoard from "../components/ContentBoard";

// import Modal from "../components/modalComponent";
// import ModalWrapper from "../components/ModalWrapper";
// import DetailWrapper from "../components/DetailWrapper";

// import Button from "../components/Button";
// import CircleButton from "../components/CircleButton";
// import { radarDefaultOptions } from "../config/graphOption";

function FriendContentBoard( backgroundColor, width, height ) {
  const history = useHistory();
  const [friendId, setFriendId] = useState("");

  useEffect(() => {
    console.log(friendId, history);
    setFriendId(1);
  },[]);

  return (
    <div>
      <ContentBoard
        background-color={backgroundColor, width, height}
        width={width}
        height={height}
      />
      <ContentBoard
        background-color={backgroundColor, width, height}
        width={width}
        height={height}
      />
    </div>
  );
}

export default FriendContentBoard;
