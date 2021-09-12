import axios from "./axiosInstance";

function getUrl(category, id) {
  return id ? `/api/customAlbum/${category}/${id}` : `/api/customAlbum/${category}`;
}

async function getAlbums(category, page) {
  const url = getUrl(category);
  const res = await axios.get(url, {
    headers: {
      page,
    },
  });

  if (res) {
    const { data, prevPage, nextPage } = res;

    return { data, prevPage, nextPage };
  }
}

async function postAlbum(category, data) {
  const url = getUrl(category);
  const res = await axios.post(url, data);

  if (res) {
    return res.data;
  }
}

async function getAlbumById(category, id) {
  const url = getUrl(category, id);
  const res = await axios.get(url);

  if (res) {
    return res.data;
  }
}

async function editAlbumById(category, id, data) {
  const url = getUrl(category, id);
  const res = await axios.patch(url, data);

  return res;
}

async function deleteAlbumById(category, id) {
  const url = getUrl(category, id);
  const res = await axios.delete(url);

  return res;
}

export {
  getAlbums, postAlbum, getAlbumById, editAlbumById, deleteAlbumById,
};
