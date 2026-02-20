import React from 'react'
import { useParams } from 'react-router-dom'

export default function TestPage(){
  const { id } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Adaptive Test #{id}</h2>
      <div className="mt-4 bg-white p-4 rounded shadow">Test UI placeholder (timer, navigator, MCQ)</div>
    </div>
  )
}
