import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseService";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCourses();
        const data = res.data ? res.data : [];
        setCourses(data);
      } catch (err) {
        console.error("failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading courses...</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-10">Courses</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#0f172a] p-6 rounded-2xl flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-4">{course.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{course.description}</p>

            <button
              onClick={() => navigate(`/student/courses/${course.id}/player`)}
              className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 mt-auto"
            >
              Start Course
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
