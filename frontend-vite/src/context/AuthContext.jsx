import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('sf_token')
    const email = localStorage.getItem('sf_email')
    const role = localStorage.getItem('sf_role')
    return token ? { token, email, role } : null
  })

  useEffect(() => {
    if (user && user.token) {
      api.setToken(user.token)
    }
  }, [user])

  const login = ({ token, email, role }) => {
    localStorage.setItem('sf_token', token)
    localStorage.setItem('sf_email', email)
    localStorage.setItem('sf_role', role)
    setUser({ token, email, role })
  }

  const logout = () => {
    localStorage.removeItem('sf_token')
    localStorage.removeItem('sf_email')
    localStorage.removeItem('sf_role')
    api.setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
