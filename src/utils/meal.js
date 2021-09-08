import axios from "./axiosInstance";

async function getMeals() {
  const res = await axios.get("/api/meal");

  return res.data;
}

async function postMeal(data) {
  const res = await axios.post("/api/meal", data);

  if (res) {
    return res.data;
  }
}

async function getMealById(id) {
  const res = await axios.get(`/api/meal/${id}`);

  return res.data;
}

async function editMealById(id, data) {
  await axios.patch(`/api/meal/${id}`, data);
}

async function deleteMealById(id) {
  await axios.delete(`/api/meal/${id}`);
}

export {
  getMeals, postMeal, getMealById, editMealById, deleteMealById,
};
