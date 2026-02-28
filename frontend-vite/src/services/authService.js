import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

const sendOtp = (email) => {
  return axios.post(`${API_BASE_URL}/send-otp`, { email });
};

const verifyOtp = (email, otp) => {
  return axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });
};

const resetPassword = (email, otp, newPassword) => {
  return axios.post(`${API_BASE_URL}/reset-password-with-otp`, {
    email,
    otp,
    newPassword,
  });
};

export { sendOtp, verifyOtp, resetPassword };
