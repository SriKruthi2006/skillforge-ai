import { useState, useEffect } from "react";

const LessonViewer = ({
  lesson,
  isCompleted,
  onMarkComplete,
  onNextLesson,
  onPrevLesson,
  courseProgress,
  fullscreen,
  setFullscreen,
}) => {


  // ESC KEY EXIT FULLSCREEN
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No lesson selected
          </h3>
          <p className="text-slate-600">
            Select a lesson from the course outline
          </p>
        </div>
      </div>
    );
  }

  const videoEmbedUrl = lesson.videoUrl
    ? lesson.videoUrl.replace("watch?v=", "embed/")
    : null;

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-xl shadow-md transition-all ${
        fullscreen ? "fixed inset-0 z-50 p-8" : ""
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between p-5 border-b bg-white rounded-t-xl">

        <h1 className="text-xl font-bold text-slate-900">
          {lesson.title}
        </h1>

        {/* FULLSCREEN BUTTON */}

        {!fullscreen ? (
          <button
            onClick={() => setFullscreen(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            ⛶ Fullscreen
          </button>
        ) : (
          <button
            onClick={() => setFullscreen(false)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            ✕ Exit Fullscreen
          </button>
        )}

      </div>

      {/* CONTENT */}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* VIDEO */}

        {videoEmbedUrl && (
          <div className="aspect-video rounded-xl overflow-hidden shadow">
            <iframe
              src={videoEmbedUrl}
              title={lesson.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}

        {/* PROGRESS */}

        {courseProgress && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

            <div className="flex justify-between mb-2">
              <span className="text-slate-700 font-medium">
                Course Progress
              </span>

              <span className="text-blue-600 font-bold">
                {courseProgress.progress}%
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${courseProgress.progress}%` }}
              />
            </div>

          </div>
        )}

        {/* LESSON CONTENT */}

        <div className="bg-slate-50 border rounded-lg p-6">

          <h2 className="text-lg font-bold mb-4">
            Lesson Content
          </h2>

          <p className="text-slate-700 whitespace-pre-wrap">
            {lesson.content || "No lesson content available."}
          </p>

        </div>

        {/* CODE EXAMPLE */}

        {lesson.codeExample && (
          <div className="bg-slate-900 text-white rounded-lg p-6">

            <h3 className="font-bold mb-3">
              Code Example
            </h3>

            <pre className="overflow-x-auto">
              <code>{lesson.codeExample}</code>
            </pre>

          </div>
        )}

        {/* ASSIGNMENT */}

        {lesson.assignment && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">

            <h3 className="font-bold mb-2">
              Assignment
            </h3>

            <p className="text-slate-700">
              {lesson.assignment}
            </p>

          </div>
        )}

        {/* ACTION BUTTONS */}

        <div className="flex gap-4 pt-6">

          <button
            onClick={onPrevLesson}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            ← Previous
          </button>

          {!isCompleted ? (
            <button
              onClick={() => onMarkComplete(lesson)}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
            >
              Mark Lesson Complete
            </button>
          ) : (
            <button
              disabled
              className="flex-1 py-3 bg-green-500 text-white rounded-lg font-bold"
            >
              Lesson Completed
            </button>
          )}

          <button
            onClick={onNextLesson}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next →
          </button>

        </div>

      </div>
    </div>
  );
};

export default LessonViewer;