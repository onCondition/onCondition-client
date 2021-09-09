import axios from "./axiosInstance";

async function postComment(data) {
  const res = await axios.post("/api/comments", data);

  if (res) {
    return res;
  }
}

async function editCommentById(id, data) {
  const res = await axios.patch(`/api/comments/${id}`, data);

  if (res) {
    return res;
  }
}

async function deleteCommentById(id) {
  const res = await axios.delete(`/api/comments/${id}`);

  if (res) {
    return res;
  }
}

export {
  postComment, editCommentById, deleteCommentById,
};
