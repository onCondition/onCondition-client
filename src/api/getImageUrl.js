import axios from "./axiosInstance";

async function getImageUrl(image) {
  const formData = new FormData();
  formData.append("image", image);

  const res = await axios.post("api/image",
    formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  return res.imageUrl;
}

export default getImageUrl;
