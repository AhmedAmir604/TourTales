import axios from "axios";
import { url } from "../../lib/data";

axios.defaults.withCredentials = true;

export const getAllTours = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/tours`,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const getTour = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/tours/${id}`,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const createNewBooking = async (tourId, date) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/booking/checkout-session/${tourId}?date=${date}`,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const getBookings = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/booking/my-tours`,
      // withCredentials: true, // Add this line
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};
