import React from "react";
import ProgressBar from "./ui/ProgressBar";

export default function LessonContent({
  lesson,
  isCompleted,
  onMarkComplete,
}) {
  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a lesson from the sidebar
      </div>
    );
  }

  const videoEmbedUrl = lesson.videoUrl
    ? lesson.videoUrl.replace("watch?v=", "embed/")
    : null;

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

      {videoEmbedUrl && (
        <div className="mb-6">
          <iframe
            width="100%"
            height="400"
            src={videoEmbedUrl}
            title="lesson video"
            className="rounded-xl"
            allowFullScreen
          />
        </div>
      )}

      <div className="prose prose-invert mb-8">
        <p>{lesson.content}</p>
      </div>

      {/* placeholder for assignment section */}
      <div className="mb-8 p-4 bg-[#1e293b] rounded-lg">
        <h3 className="font-semibold mb-2">Assignment</h3>
        <p className="text-gray-400">(Coming soon)</p>
      </div>

      {!isCompleted && (
        <button
          onClick={() => onMarkComplete(lesson)}
          className="px-6 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700"
        >
          Mark Complete
        </button>
      )}
    </div>
  );
}