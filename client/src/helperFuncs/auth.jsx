import axios from "axios";
import { url } from "../../lib/data";

// Ensure cookies are sent with requests becuase the server not accepting the cookies from diff host
// port number is changed :)
axios.defaults.withCredentials = true;

axios.defaults.headers.get["Cache-Control"] = "no-cache";
axios.defaults.headers.get["Pragma"] = "no-cache";
axios.defaults.headers.get["Expires"] = "0";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/users/login`, // Full URL with port
      data: {
        email,
        password,
      },
    });
    return res;
  } catch (err) {
    throw err.response.data; // Rethrow error to handle it in the caller
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const isLoggedIn = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/users/isLoggedIn`,
    });
    return res;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/users/logout`,
    });
    return res;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

export const generateOtp = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/users/forgot-password`,
      data: { email },
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/users/reset-password`,
      data: { otp },
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const resetPassword = async (data, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${url}/users/reset-password/${id}`,
      data,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};
