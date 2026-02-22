import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // ✅ LOGIN
  const login = async (email, password) => {
  const res = await axios.post(
    "http://localhost:8080/api/auth/login",
    {
      email: email,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};

  // ✅ REGISTER
  const register = async (userData) => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const data = res.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);

    return data;
  };

  return (
    <AuthContext.Provider value={{ login, register, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);