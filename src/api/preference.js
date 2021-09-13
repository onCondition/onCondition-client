import axios from "./axiosInstance";

async function getNewGoogleFitData(id) {
  const res = await axios.post(`/api/preference/${id}`);

  if (res) {
    return res.data;
  }
}

async function addCategory(id) {
  const res = await axios.post(`/api/preference/${id}`);

  if (res) {
    return res.data;
  }
}

async function deleteCategoryById(id) {
  const res = await axios.delete(`/api/preference/${id}`);

  return res;
}

async function editActivityById(id, data) {
  const res = await axios.patch(`/api/activity/${id}`, data);

  return res;
}

export {
  addCategory,
  editActivityById,
  deleteCategoryById,
  getNewGoogleFitData,
};
