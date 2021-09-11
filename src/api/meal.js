import axios from "./axiosInstance";

async function getMeals(id, page) {
  const res = await axios.get(`/api/${id}/meal`, {
    headers: {
      page,
    },
  });

  if (res) {
    const { data, prevPage, nextPage } = res;

    return { data, prevPage, nextPage };
  }
}

async function postMeal(id, data) {
  const res = await axios.post(`/api/${id}/meal`, data);

  if (res) {
    return res.data;
  }
}

async function getMealById(mealId) {
  const res = await axios.get(`/api/meal/${mealId}`);

  if (res) {
    return res.data;
  }
}

async function editMealById(id, mealId, data) {
  const res = await axios.patch(`/api/${id}/meal/${mealId}`, data);

  return res;
}

async function deleteMealById(id, mealId) {
  const res = await axios.delete(`/api/${id}/meal/${mealId}`);

  return res;
}

export {
  getMeals, postMeal, getMealById, editMealById, deleteMealById,
};
