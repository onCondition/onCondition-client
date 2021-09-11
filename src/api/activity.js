import axios from "./axiosInstance";

async function getActivities(id, page) {
  const res = await axios.get(`/api/${id}/activity`, {
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

async function getActivityById(activityId) {
  const res = await axios.get(`/api/activity/${activityId}`);

  if (res) {
    return res.data;
  }
}

async function editActivityById(id, activityId, data) {
  const res = await axios.patch(`/api/${id}/activity/${activityId}`, data);

  return res;
}

async function deleteActivityById(id, activityId) {
  const res = await axios.delete(`/api/${id}/activity/${activityId}`);

  return res;
}

export {
  getActivities,
  getActivityById,
  editActivityById,
  deleteActivityById,
};
