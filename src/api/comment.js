import axios from "./axiosInstance";

async function postComment(data) {
  const res = await axios.post("/api/comments", data);

  if (res) {
    return res;
  }
}

async function editCommentById(creator, data) {
  const res = await axios.patch(`/api/comments/${creator}`, data);

  if (res) {
    return res;
  }
}

async function deleteCommentById(creator) {
  const res = await axios.delete(`/api/comments/${creator}`);

  if (res) {
    return res;
  }
}

export {
  postComment, editCommentById, deleteCommentById,
};
