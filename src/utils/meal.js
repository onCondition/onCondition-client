import axios from "./axiosInstance";

async function getMeals() {
  const res = await axios.get("/api/meal");

  return res.data;
}

async function postMeal(data) {
  await axios.post("/api/meal", data);
}

export { getMeals, postMeal };
