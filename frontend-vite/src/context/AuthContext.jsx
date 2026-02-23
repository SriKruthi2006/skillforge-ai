import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 LOGIN FUNCTION
  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save full user object
      localStorage.setItem("user", JSON.stringify(response.data));

      setUser(response.data);

      return response.data;
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      throw error;
    }
  };

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};