import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../../services/courseService";

const NewCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data || []);
      } catch (e) {
        console.error("failed to load courses", e);
      }
    };
    fetch();
  }, []);

  const handleOpenCourse = (id) => {
    navigate(`/student/courses/${id}/player`);
  };

  return (
    <div className="bg-[#0f172a] p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">New Courses</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1e293b] p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-2">
              {course.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {course.description}
            </p>

            <button
              onClick={() => handleOpenCourse(course.id)}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg"
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCourses;
