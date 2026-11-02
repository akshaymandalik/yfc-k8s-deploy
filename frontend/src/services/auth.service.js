import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      username: formData.username,
      password: formData.password,
    });
    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      response:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};
export const signin = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signin`, {
      username: formData.username,
      password: formData.password,
    });

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    const data = error.response?.data;

    return {
      success: false,
      response:
        data?.message ||
        data?.error?.[0] ||
        data?.errors?.[0] ||
        error.message ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};
export const isUserExist = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/isUserExist`, {
      username,
    });
    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      response:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};

export const verifyOtp = async (otp) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verifyOtp`, {
      otp,
    });
    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      response:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};

export const updateUserPass = async (formData) => {
  console.log(formData, "formdata");

  try {
    const response = await axios.post(`${API_URL}/api/auth/updateUserPass`, {
      username: formData.username,
      password: formData.password,
    });
    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      response:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};