import axios from "./axiosInstance";

async function getImageUrl(creatorId, image) {
  const formData = new FormData();
  formData.append("image", image);

  const res = await axios.post(`/api/${creatorId}/image`,
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
