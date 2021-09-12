import axios from "./axiosInstance";

async function getCondition(creatorId) {
  const res = await axios.get(`/api/${creatorId}`);

  if (res) {
    return res.data;
  }
}

export { getCondition };
