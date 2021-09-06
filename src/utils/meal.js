import axios from "./axiosInstance";

async function postMeal(data) {
  await axios.post("/api/meal", data);
}

export { postMeal };
