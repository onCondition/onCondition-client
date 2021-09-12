import axios from "./axiosInstance";

const BASE = "/api";

function joinUrl(...args) {
  return args.join("/");
}

async function get(category, creator, page) {
  const res = await axios.get(joinUrl(BASE, creator, category), {
    headers: {
      page,
    },
  });

  if (res) {
    const { data, prevPage, nextPage } = res;

    return { data, prevPage, nextPage };
  }
}

async function post(category, creator, data) {
  const res = await axios.post(joinUrl(BASE, creator, category), data);

  if (res) {
    return res.data;
  }
}

async function getById(category, ratingId) {
  const res = await axios.get(joinUrl(BASE, category, ratingId));

  if (res) {
    return res.data;
  }
}

async function editById(category, creator, ratingId, data) {
  const res = await axios.patch(
    joinUrl(BASE, creator, category, ratingId)
    , data);

  return res;
}

async function deleteById(category, creator, ratingId) {
  const res = await axios.delete(joinUrl(BASE, creator, category, ratingId));

  return res;
}

function generateApiInstance(category) {
  return {
    get: get.bind(null, category),
    post: post.bind(null, category),
    getById: getById.bind(null, category),
    editById: editById.bind(null, category),
    deleteById: deleteById.bind(null, category),
  };
}

const api = {
  meal: generateApiInstance("meal"),
  activity: generateApiInstance("activity"),
  sleep: generateApiInstance("sleep"),
  custom: generateApiInstance,
};

export default api;
