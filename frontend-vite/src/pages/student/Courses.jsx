import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import coursesData from "../../data/coursesData";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const courseIdFromURL = searchParams.get("courseId");

  useEffect(() => {
    if (courseIdFromURL) {
      setSelectedCourseId(Number(courseIdFromURL));
    }
  }, [courseIdFromURL]);

  const selectedCourse = coursesData.find(
    (course) => course.id === selectedCourseId
  );

  // ================= COURSE DETAILS =================
  if (selectedCourse) {
    return (
      <div>
        <button
          onClick={() => setSelectedCourseId(null)}
          className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
        >
          ← Back to Courses
        </button>

        <h1 className="text-4xl font-bold mb-2">
          {selectedCourse.title}
        </h1>

        <p className="text-gray-400 mb-8">
          {selectedCourse.description}
        </p>

        <div className="bg-[#0f172a] p-6 rounded-2xl space-y-4">
          {selectedCourse.lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{lesson.title}</p>
                <span className="text-xs text-gray-400">
                  {lesson.level}
                </span>
              </div>

              <div className="flex gap-3">
                <button
  onClick={() => setVideoUrl("open")}
  className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition"
>
  Watch Video
</button>

                <button
                  onClick={() =>
                    navigate(`/student/tests/${selectedCourse.id}`)
                  }
                  className="px-4 py-2 bg-green-600 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  Assignment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🎥 VIDEO MODAL */}
        {videoUrl && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-[#0f172a] w-[900px] h-[500px] rounded-2xl relative flex flex-col">

      {/* Close Button */}
      <button
        onClick={() => setVideoUrl(null)}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✖
      </button>

      {/* Fake Video Screen */}
      <div className="flex-1 bg-black rounded-t-2xl flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Video Screen
        </p>
      </div>

      {/* Video Title Section */}
      <div className="p-6">
        <h2 className="text-lg font-semibold">
          Lesson Video
        </h2>
        <p className="text-gray-400 text-sm">
          This is where your video content will appear.
        </p>
      </div>

    </div>
  </div>
)}
      </div>
    );
  }

  // ================= COURSE LIST =================
  return (
    <>
      <h1 className="text-4xl font-bold mb-10">
        Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className="bg-[#0f172a] p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">
              {course.title}
            </h3>

            <div className="h-3 bg-[#1e293b] rounded-full mb-3">
              <div
                className="h-3 rounded-full bg-purple-600"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <p className="text-gray-400 mb-5">
              {course.progress}% completed
            </p>

            <button
              onClick={() =>
                setSelectedCourseId(course.id)
              }
              className="w-full py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Resume
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;