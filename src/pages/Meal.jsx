import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import List from "../components/List";
import ContentForm from "../components/ContentForm";
import HeartCounter from "../components/HeartCounter";
import { getMeals, postMeal } from "../utils/meal";
import theme from "../theme";

const Title = styled.p`
  margin: 10px 0px 10px 30px;
  color: ${({ theme }) => theme.background.mint};
  text-align: left;
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;

  .list {
    flex-grow: 1;
    max-width: 680px;
  }

  .viewer {
    width: 680px;
    text-align: center;
  }
`;

function Meal() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      const loadedMeals = await getMeals();

      setMeals(loadedMeals);
    }

    loadMeals();
  }, []);

  const handleSubmitForm = async function ({
    date, heartCount, url, text,
  }) {
    const newMeal = await postMeal({
      date, url, heartCount, text,
    });

    if (newMeal) {
      setMeals((meals) => [...meals, newMeal]);
    }
  };

  const mealBars = meals.map((meal) => {
    return (
      <Link to={`/meal/${meal._id}`} key={meal._id}>
        <List color={theme.point.mainPink} key={meal.id}>
          {meal.url
            ? <img src={meal.url} />
            : <img src="/img/add-picture.png" />}
          <div>{meal.date}</div>
          <HeartCounter count={meal.rating.heartCount} />
        </List>
      </Link>
    );
  });

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
          {mealBars}
        </div>
      </Container>
    </div>
  );
}

export default Meal;
