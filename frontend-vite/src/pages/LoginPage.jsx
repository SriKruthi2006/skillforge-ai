import React, { useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const resp = await api.post('/auth/login', { email, password })
      login(resp)
      nav('/')
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="w-full max-w-md p-8 bg-white rounded shadow" onSubmit={submit}>
        <h2 className="text-2xl font-semibold mb-6">Sign in to SkillForge</h2>
        <input className="w-full p-3 border rounded mb-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-3 border rounded mb-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-3 bg-indigo-600 text-white rounded" disabled={loading}>{loading? 'Signing...':'Sign in'}</button>
        <div className="mt-4 text-sm">Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link></div>
      </form>
    </div>
  )
}
