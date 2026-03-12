import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../../services/courseService";

const ResumeLearning = () => {
  const navigate = useNavigate();
  const [lastCourse, setLastCourse] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCourses();
        const arr = res.data || [];
        if (arr.length) setLastCourse(arr[0]);
      } catch (e) {
        console.error("could not fetch courses", e);
      }
    };
    fetch();
  }, []);

  if (!lastCourse) {
    return null;
  }

  const handleResume = () => {
    navigate(`/student/courses/${lastCourse.id}/player`);
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg mb-2">Resume Learning</h3>
        <p className="text-gray-400">
          {lastCourse.title}
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
