import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import coursesData from "../../data/coursesData";
import axios from "axios";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const selectedCourse = coursesData.find(
    (course) => course.id === Number(courseId)
  );

  const [completedLessons, setCompletedLessons] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/progress/${courseId}`)
      .then((res) => setCompletedLessons(res.data))
      .catch(() => {});
  }, [courseId]);

  const markCompleted = async (lessonTitle) => {
    const updated = [...completedLessons, lessonTitle];
    setCompletedLessons(updated);

    await axios.post("http://localhost:8080/api/progress", {
      courseId,
      lessonTitle,
    });
  };

  if (!selectedCourse) return <h1>Course Not Found</h1>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        {selectedCourse.title}
      </h1>

      <div className="space-y-4">
        {selectedCourse.lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.title);

          return (
            <div
              key={index}
              className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-medium flex items-center gap-2">
                  {lesson.title}
                  {isCompleted && (
                    <span className="text-green-400">✔</span>
                  )}
                </p>
                <span className="text-xs text-gray-400">
                  {lesson.level}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
                  }
                  className="px-4 py-2 bg-blue-600 rounded-lg text-sm"
                >
                  Watch Video
                </button>

                <button
                  onClick={() => navigate(`/student/tests/${courseId}`)}
                  className="px-4 py-2 bg-green-600 rounded-lg text-sm"
                >
                  Assignment
                </button>

                {!isCompleted && (
                  <button
                    onClick={() => markCompleted(lesson.title)}
                    className="px-4 py-2 bg-purple-600 rounded-lg text-sm"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🎥 VIDEO MODAL */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-[#0f172a] p-4 rounded-xl relative w-[800px]">
            <button
              onClick={() => setVideoUrl(null)}
              className="absolute top-2 right-2 text-white"
            >
              ✖
            </button>
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              title="Video"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;