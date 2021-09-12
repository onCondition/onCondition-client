import axios from "./axiosInstance";

async function getCondition(creator) {
  const res = await axios.get(`/api/${creator}`);

  if (res) {
    return res;
  }
}

export { getCondition };
