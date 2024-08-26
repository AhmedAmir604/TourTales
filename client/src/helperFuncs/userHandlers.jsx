import axios from "axios";
import { url } from "../../lib/data";

//Get Review is not used but i will remove it soon no need of it :D
//You can remove it :)

export const getReview = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/tours/${id}/reviews`,
    });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const updateSettings = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${url}/users/updateMyDetails`,
      data,
    });
    return res;
  } catch (err) {
    throw err.response.data.message;
  }
};

export const updatePassword = async (
  password,
  newPassword,
  confirmNewPassword
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${url}/users/updatePassword`,
      data: {
        password,
        newPassword,
        confirmNewPassword,
      },
    });
    return res;
  } catch (err) {
    throw err.response.data.message;
  }
};
