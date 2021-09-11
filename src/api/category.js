import axios from "./axiosInstance";

const BASE = "/api";

function joinUrl(...args) {
  return args.join("/");
}

async function get(category, id, page) {
  const res = await axios.get(joinUrl(BASE, id, category), {
    headers: {
      page,
    },
  });

  if (res) {
    const { data, prevPage, nextPage } = res;

    return { data, prevPage, nextPage };
  }
}

async function post(category, id, data) {
  const res = await axios.post(joinUrl(BASE, id, category), data);

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

async function editById(category, id, ratingId, data) {
  const res = await axios.patch(joinUrl(BASE, id, category, ratingId), data);

  return res;
}

async function deleteById(category, id, ratingId) {
  const res = await axios.delete(joinUrl(BASE, id, category, ratingId));

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
