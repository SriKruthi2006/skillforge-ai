import { useEffect, useState } from "react"
import { studentAPI } from "../../services/api"

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

try{

const user = JSON.parse(localStorage.getItem("user"))
const studentId = user.id

const res = await studentAPI.getDashboard(studentId)

setStats({
completedLessons: res.data.completedLessons,
totalLessons: res.data.totalLessons,
progress: res.data.progress
})

setCourses(res.data.courses || [])

setName(res.data.name)

}catch(err){
console.error("Dashboard error:", err)
}

}

return(

<div className="p-8 space-y-8">

{/* HEADER */}

<div>

<h1 className="text-3xl font-bold text-white">
Welcome Back {name} 👋
</h1>

<p className="text-gray-400">
Continue your learning journey
</p>

</div>


{/* CONTINUE LEARNING */}

<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">

<h3 className="text-lg font-semibold mb-2">
Continue Learning
</h3>

<p className="text-sm opacity-90">
Resume your last lesson
</p>

<button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">
Resume
</button>

</div>


{/* STATS */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-white rounded-xl p-6 shadow">

<p className="text-gray-500 text-sm">
Completed Lessons
</p>

<h2 className="text-3xl font-bold text-purple-600">
{stats.completedLessons}
</h2>

</div>

<div className="bg-white rounded-xl p-6 shadow">

<p className="text-gray-500 text-sm">
Total Lessons
</p>

<h2 className="text-3xl font-bold text-blue-600">
{stats.totalLessons}
</h2>

</div>

<div className="bg-white rounded-xl p-6 shadow">

<p className="text-gray-500 text-sm">
Progress
</p>

<h2 className="text-3xl font-bold text-green-600">
{stats.progress}%
</h2>

<div className="w-full bg-gray-200 h-2 rounded mt-3">

<div
className="bg-green-500 h-2 rounded"
style={{width:`${stats.progress}%`}}
/>

</div>

</div>

</div>


{/* COURSES */}

<div>

<h3 className="text-xl font-semibold text-white mb-4">
Your Courses
</h3>

{courses.length === 0 ? (

<div className="bg-white rounded-xl p-6 text-gray-500">
No enrolled courses yet
</div>

) : (

<div className="grid grid-cols-3 gap-6">

{courses.map(course => (

<div key={course.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">

<h4 className="font-semibold text-lg mb-2">
{course.title}
</h4>

<p className="text-sm text-gray-500 mb-3">
{course.description}
</p>

<div className="w-full bg-gray-200 h-2 rounded">

<div
className="bg-purple-600 h-2 rounded"
style={{width:`${course.progress || 0}%`}}
/>

</div>

<p className="text-sm text-gray-600 mt-2">
Progress {course.progress || 0}%
</p>

</div>

))}

</div>

)}

</div>

</div>

)

}

export default DashboardHome