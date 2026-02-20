import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Courses(){
  const [courses, setCourses] = useState([])
  useEffect(()=>{api.get('/courses').then(setCourses).catch(()=>{})},[])
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map(c => (
          <div key={c.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
