import { useNavigate } from "react-router-dom";
import coursesData from "../../../data/coursesData";

const NewCourses = () => {
  const navigate = useNavigate();

  const handleOpenCourse = (id) => {
    navigate(`/student/tests/${id}`);
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg mb-6">New Courses</h3>

      <div className="grid grid-cols-3 gap-4">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className="bg-[#1e293b] p-4 rounded-xl"
          >
            <h4 className="font-semibold mb-2">
              {course.title}
            </h4>

            <p className="text-sm text-gray-400 mb-3">
              {course.description}
            </p>

            <button
              onClick={() => handleOpenCourse(course.id)}
              className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
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