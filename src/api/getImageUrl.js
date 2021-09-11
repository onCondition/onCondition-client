import axios from "./axiosInstance";

async function getImageUrl(id, image) {
  const formData = new FormData();
  formData.append("image", image);

  const res = await axios.post(`/api/${id}/image`,
    formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  if (res) {
    return res.imageUrl;
  }
}

export default getImageUrl;
