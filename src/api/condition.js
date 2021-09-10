import axios from "./axiosInstance";

async function getCondition() {
  const res = await axios.get("/api/condition");

  if (res) {
    return res;
  }
}

export { getCondition };
