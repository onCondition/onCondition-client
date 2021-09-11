import axios from "./axiosInstance";

async function getCondition(id) {
  const res = await axios.get(`/api/${id}`);

  if (res) {
    return res;
  }
}

export { getCondition };
