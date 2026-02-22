import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// handle 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// 🔐 AUTH
export const authAPI = {
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),
};

// 🎓 STUDENT
export const studentAPI = {
  getDashboard: () => API.get("/student/dashboard"),
  getCourses: () => API.get("/student/courses"),
};

// 🛠 ADMIN
export const adminAPI = {
  getDashboard: () => API.get("/admin/dashboard"),
};

export default API;