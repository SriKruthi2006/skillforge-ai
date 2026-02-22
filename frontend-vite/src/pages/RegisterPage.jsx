import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [loading, setLoading] = useState(false)

  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌")
      return
    }

    setLoading(true)

    try {
      await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
        role
      })

      alert("Registration successful ✅ Please login")
      nav('/login')

    } catch (err) {
      console.log(err)
      alert(err?.response?.data?.message || 'Registration failed ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <form 
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
        onSubmit={submit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Create Account 🚀
        </h2>

        <div className="flex gap-3">
          <input
            className="w-1/2 p-3 border rounded mb-3"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            className="w-1/2 p-3 border rounded mb-3"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>

        <input
          className="w-full p-3 border rounded mb-3"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-3 border rounded mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          className="w-full p-3 border rounded mb-3"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <div className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}