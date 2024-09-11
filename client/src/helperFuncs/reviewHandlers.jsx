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
