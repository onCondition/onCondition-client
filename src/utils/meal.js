import axios from "./axiosInstance";

async function getMeals() {
  const res = await axios.get("/api/meal");

  if (res) {
    return res.data;
  }
}

async function postMeal(data) {
  const res = await axios.post("/api/meal", data);

  if (res) {
    return res.data;
  }
}

async function getMealById(id) {
  const res = await axios.get(`/api/meal/${id}`);

  if (res) {
    return res.data;
  }
}

async function editMealById(id, data) {
  const res = await axios.patch(`/api/meal/${id}`, data);

  return res;
}

async function deleteMealById(id) {
  const res = await axios.delete(`/api/meal/${id}`);

  return res;
}

export {
  getMeals, postMeal, getMealById, editMealById, deleteMealById,
};
