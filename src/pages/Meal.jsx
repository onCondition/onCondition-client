import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import List from "../components/List";
import { PrevButton, NextButton } from "../components/PageButton";
import ContentForm from "../components/ContentForm";
import HeartCounter from "../components/HeartCounter";
import { getMeals, postMeal } from "../utils/meal";
import COLORS from "../constants/colors";

const Title = styled.p`
  margin: 10px 0px 10px 30px;
  color: ${COLORS.MAIN_MINT};
  text-align: left;
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;

  .list {
    flex-grow: 1;
    justify-items: center;
    max-width: 680px;
  }

  .viewer {
    width: 680px;
    text-align: center;
  }
`;

function Meal() {
  const [meals, setMeals] = useState([]);
  const [isReloadRequired, setIsReloadRequired] = useState(true);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  async function loadMeals(page = 1) {
    const result = await getMeals(page);

    if (!result) {
      return;
    }

    setPrevPage(result.prevPage);
    setNextPage(result.nextPage);
    setMeals(result.data);
    setIsReloadRequired(false);
  }

  useEffect(() => {
    if (!isReloadRequired) {
      return;
    }

    loadMeals();
  }, [isReloadRequired]);

  const handleSubmitForm = async function ({
    date, heartCount, url, text,
  }) {
    const newMeal = await postMeal({
      date, url, heartCount, text,
    });

    if (newMeal) {
      setIsReloadRequired(true);
    }
  };

  const handlePrevPageButton = function () {
    loadMeals(prevPage);
  };

  const handleNextPageButton = function () {
    loadMeals(nextPage);
  };

  const mealBars = (meals.length) ? meals.map((meal) => {
    return (
      <Link to={`/meal/${meal._id}`} key={meal._id}>
        <List color={COLORS.MAIN_CORAL} key={meal.id}>
          {meal.url
            ? <img src={meal.url} />
            : <img src="/img/add-picture.png" />}
          <div>{meal.date}</div>
          <HeartCounter count={meal.rating.heartCount} />
        </List>
      </Link>
    );
  }) : [];

  return (
    <div>
      <Title>식사</Title>
      <Container>
        <div className="viewer">
          <ContentForm
            hasPicture
            onSubmit={handleSubmitForm}
            submitButtonText="add meal"
          />
        </div>
        <div className="list">
          {!!prevPage && <PrevButton onClick={handlePrevPageButton} />}
          {mealBars}
          {!!nextPage && <NextButton onClick={handleNextPageButton} />}
        </div>
      </Container>
    </div>
  );
}

export default Meal;
