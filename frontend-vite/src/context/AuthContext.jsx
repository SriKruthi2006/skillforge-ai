import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // 🔐 LOGIN
  const login = async (data) => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      data
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    return res.data;
  };

  // 🆕 REGISTER FUNCTION 
  const register = async (data) => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/register",
      data
    );

    return res.data;
  };

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};