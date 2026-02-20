import React from 'react'
import { useParams } from 'react-router-dom'

export default function Report(){
  const { id } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Report for Test #{id}</h2>
      <div className="mt-4 bg-white p-4 rounded shadow">Score summary, weak areas, improvement chart placeholder</div>
    </div>
  )
}
