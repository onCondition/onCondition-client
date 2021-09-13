import axios from "./axiosInstance";

const BASE = "/api";

function joinUrl(...args) {
  return args.join("/");
}

async function getById(creatorId, friendId) {
  const res = await axios.get(joinUrl(BASE, creatorId, "friends", friendId));

  if (res) {
    return res;
  }
}

async function deleteById(creatorId, friendId) {
  const res = await axios.delete(joinUrl(BASE, creatorId, "friends", friendId));

  if (res) {
    return res;
  }
}

export { getById, deleteById };
