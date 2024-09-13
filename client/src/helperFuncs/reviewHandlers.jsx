import axios from "axios";
import { url } from "../../lib/data";

axios.defaults.withCredentials = true;
axios.defaults.headers.get["Cache-Control"] = "no-cache";
axios.defaults.headers.get["Pragma"] = "no-cache";
axios.defaults.headers.get["Expires"] = "0";

export const addReview = async (data) => {
  try {
    const { tourId } = data;
    const res = await axios({
      method: "POST",
      url: `${url}/tours/${tourId}/reviews`,
      data,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const getAllReviews = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/users/reviews/my-reviews`,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const deleteReview = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${url}/reviews/${id}`,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const editReview = async (data) => {
  try {
    const { id } = data;

    const res = await axios({
      method: "PATCH",
      url: `${url}/reviews/${id}`,
      data,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};
