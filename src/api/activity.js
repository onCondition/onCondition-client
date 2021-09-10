import axios from "./axiosInstance";

async function getActivities(page) {
  const res = await axios.get("/api/activity", {
    headers: {
      page,
    },
  });

  if (res) {
    const {
      stepCount, activities, prevPage, nextPage,
    } = res;

    return {
      stepCount, activities, prevPage, nextPage,
    };
  }
}

async function getActivityById(id) {
  const res = await axios.get(`/api/activity/${id}`);

  if (res) {
    return res.data;
  }
}

async function editActivityById(id, data) {
  const res = await axios.patch(`/api/activity/${id}`, data);

  return res;
}

async function deleteActivityById(id) {
  const res = await axios.delete(`/api/activity/${id}`);

  return res;
}

export {
  getActivities,
  getActivityById,
  editActivityById,
  deleteActivityById,
};
