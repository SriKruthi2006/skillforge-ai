import { useEffect, useState } from "react"
import axios from "axios"

const CourseViewer = () => {

const [lessons,setLessons] = useState([])
const [selectedLesson,setSelectedLesson] = useState(null)

const courseId = 1

useEffect(()=>{
loadLessons()
},[])

const loadLessons = async () => {

try{

const res = await axios.get(
"http://localhost:8080/api/lessons/course/" + courseId
)

setLessons(res.data)

}catch(err){
console.error("Lesson load error",err)
}

}

return(

<div className="flex gap-6 p-6">

{/* LEFT SIDEBAR LESSON LIST */}

<div className="w-[350px] bg-white rounded-xl shadow p-4 h-[600px] overflow-y-auto">

<h2 className="font-bold mb-4 text-lg">
Course Content
</h2>

{lessons.map((lesson)=>(
<div
key={lesson.id}
onClick={()=>setSelectedLesson(lesson)}
className="p-3 border rounded mb-3 cursor-pointer hover:bg-gray-100 transition"
>

{lesson.title}

</div>
))}

</div>


{/* RIGHT LESSON CONTENT */}

<div className="flex-1 bg-white rounded-xl shadow p-6">

{selectedLesson ? (

<div>

<h2 className="text-2xl font-bold mb-4">
{selectedLesson.title}
</h2>

<p className="text-gray-700 leading-7">
{selectedLesson.content}
</p>

<h3 className="mt-6 font-semibold text-lg">
Example Code
</h3>

<pre className="bg-black text-green-400 p-4 rounded mt-3 overflow-x-auto">
{selectedLesson.example_code}
</pre>

</div>

) : (

<p className="text-gray-500">
Select a lesson from the left panel
</p>

)}

</div>

</div>

)

}

export default CourseViewer