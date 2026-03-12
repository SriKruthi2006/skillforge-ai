import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseService";

const TestSelect = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data || []);
      } catch (e) {
        console.error("failed to load courses", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">
        Select Course for Quiz
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#0f172a] p-6 rounded-2xl shadow-lg"
          >
            <h3 className="mb-4 font-semibold">
              {course.title}
            </h3>

            <button
              onClick={() =>
                navigate(`/student/tests/${course.id}`)
              }
              className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSelect;
