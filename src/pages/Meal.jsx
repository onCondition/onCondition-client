import React, { useState } from "react";
import styled from "styled-components";

import List from "../components/List";
import ContentContainer from "../components/ContentContainer";
import ContentForm from "../components/ContentForm";
import getImgUrl from "../api/getImgUrl";
import { postMeal } from "../api/onCondition";

const Title = styled.p`
  margin: 10px 0px 10px 30px;
  color: #66BEB2;
  text-align: left;
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .list {
    flex-grow: 1;
    padding-left: 20px;
    max-width: 790px;
  }

  .viewer {
    width: 680px;
    text-align: center;
  }
`;

function Meal() {
  const [clickedSession, setClickedSession] = useState(null);
  const handleSubmitForm = async function ({
    date, heartCount, image, text
  }) {
    let url = "";

    if (image) {
      url = await getImgUrl(image);
    }

    postMeal({
      date, url, heartCount, text
    });
  };

  return (
    <div>
      <Title>식사</Title>
      <Container>
        <div className="list">
          <List color="coral" onClick={setClickedSession}>sfs</List>
          <List color="mint">wow</List>
        </div>
        <div className="viewer">
          { clickedSession
            ? <ContentContainer heartCount={5} hasPicture />
            : <ContentForm
              hasPicture
              onSubmit={handleSubmitForm}
            />
          }
        </div>
      </Container>
    </div>
  );
}

export default Meal;
