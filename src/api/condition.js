import axios from "./axiosInstance";

async function getCondition(creatorId) {
  const res = await axios.get(`/api/${creatorId}`);

  if (res) {
    const { data, status } = res;

    return { data, status };
  }
}

export { getCondition };
