import { useEffect, useState } from "react"
import axios from "axios"

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
)

const DashboardHome = () => {

const [stats,setStats] = useState({
completedLessons:0,
totalLessons:0,
progress:0
})

const [courses,setCourses] = useState([])
const [name,setName] = useState("Student")

useEffect(()=>{
loadDashboard()
},[])

const loadDashboard = async () => {

  try {

    const user = JSON.parse(localStorage.getItem("user"))

    const studentId = user.id

    const res = await axios.get(`/api/student/dashboard/${studentId}`)

    setStats({
      completedLessons: res.data.completedLessons,
      totalLessons: res.data.totalLessons,
      progress: res.data.progress
    })

    setCourses(res.data.courses || [])

    setName(res.data.name)

  } catch(err) {
    console.error("Dashboard error:", err)
  }

}

const chartData = {

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[
{
label:"Learning Progress",
data:[
stats.progress*0.1,
stats.progress*0.2,
stats.progress*0.3,
stats.progress*0.5,
stats.progress*0.7,
stats.progress*0.9,
stats.progress
],
borderColor:"#7c3aed",
backgroundColor:"#7c3aed",
tension:0.4
}
]

}

return(

<div className="p-8 space-y-8 text-gray-800">

{/* HEADER */}

<div>

<h1 className="text-3xl font-bold text-white">
Welcome Back {name || "Student"} 👋
</h1>

<p className="text-gray-400">
Track your learning progress
</p>

</div>

{/* STATS */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-white rounded-xl p-6 shadow">
<p className="text-gray-500 text-sm">Completed Lessons</p>
<h2 className="text-3xl font-bold">{stats.completedLessons}</h2>
</div>

<div className="bg-white rounded-xl p-6 shadow">
<p className="text-gray-500 text-sm">Total Lessons</p>
<h2 className="text-3xl font-bold">{stats.totalLessons}</h2>
</div>

<div className="bg-white rounded-xl p-6 shadow">

<p className="text-gray-500 text-sm">Overall Progress</p>

<h2 className="text-3xl font-bold">{stats.progress}%</h2>

<div className="w-full bg-gray-200 h-2 rounded mt-3">
<div
className="bg-purple-600 h-2 rounded"
style={{width:`${stats.progress}%`}}
/>
</div>

</div>

</div>

{/* SECOND ROW */}

<div className="grid grid-cols-2 gap-6">

{/* RESUME LEARNING */}

<div className="bg-white rounded-xl p-6 shadow">

<h3 className="text-lg font-semibold mb-4">
Resume Learning
</h3>

{stats.completedLessons === 0 ? (

<p className="text-gray-500">
You haven't started any course yet.
</p>

) : (

<div className="flex justify-between items-center">

<div>
<p className="font-semibold">
Continue your last lesson
</p>

<p className="text-sm text-gray-500">
Resume learning where you left
</p>
</div>

<button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
Continue
</button>

</div>

)}

</div>

{/* GRAPH */}

<div className="bg-white rounded-xl p-6 shadow">

<h3 className="text-lg font-semibold mb-4">
Weekly Learning
</h3>

<Line data={chartData}/>

</div>

</div>

{/* NEW COURSES */}

<div className="bg-white rounded-xl p-6 shadow">

<h3 className="text-lg font-semibold mb-6">
New Courses
</h3>

<div className="grid grid-cols-3 gap-4">

{courses.length === 0 ? (

<p className="text-gray-500">
No new courses available
</p>

) : (

courses.map(course=>(
<div
key={course.id}
className="border p-4 rounded-lg hover:shadow"
>

<h4 className="font-semibold">
{course.title}
</h4>

<p className="text-sm text-gray-500">
{course.description}
</p>

</div>
))

)}

</div>

</div>

</div>

)

}

export default DashboardHome