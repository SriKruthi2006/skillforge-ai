import { useNavigate } from "react-router-dom";
import coursesData from "../../../data/coursesData";

const ResumeLearning = () => {
  const navigate = useNavigate();

  // Example: last active course
  const lastCourse = coursesData[0];

  const handleResume = () => {
    navigate(`/student/tests/${lastCourse.id}`);
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg mb-2">Resume Learning</h3>
        <p className="text-gray-400">
          {lastCourse.title} - {lastCourse.progress}% completed
        </p>
      </div>

      <button
        onClick={handleResume}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#7c3aed] font-semibold hover:opacity-90 transition"
      >
        Resume
      </button>
    </div>
  );
};

export default ResumeLearning;