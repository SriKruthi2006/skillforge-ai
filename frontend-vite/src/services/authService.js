import axios from "axios";
import api from "./api";

const API_BASE_URL = "http://localhost:8080/api/auth";

// Register User
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Send OTP
export const sendOtp = (email) => {
  return axios.post(`${API_BASE_URL}/send-otp`, { email });
};

// Verify OTP
export const verifyOtp = (email, otp) => {
  return axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });
};

// Reset Password
export const resetPassword = (email, otp, newPassword) => {
  return axios.post(`${API_BASE_URL}/reset-password-with-otp`, {
    email,
    otp,
    newPassword,
  });
};