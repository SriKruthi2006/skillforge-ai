import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { user, logout } = useAuth()
  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SkillForge Dashboard</h1>
        <div>
          <span className="mr-4">{user?.email}</span>
          <button onClick={logout} className="px-3 py-2 bg-gray-200 rounded">Logout</button>
        </div>
      </header>
      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">Progress cards placeholder</div>
        <div className="p-4 bg-white shadow rounded">Weekly chart placeholder</div>
        <div className="p-4 bg-white shadow rounded">AI recommendations placeholder</div>
      </section>
      <div className="mt-6">
        <Link to="/courses" className="text-indigo-600">View Courses</Link>
      </div>
    </div>
  )
}
