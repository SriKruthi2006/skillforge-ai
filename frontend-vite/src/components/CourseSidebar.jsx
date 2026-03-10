import React from "react";

// topics: array of { id, title, lessons: [...] }
// completedLessons: array of lesson ids
// selectedLessonId: currently active lesson id
// onLessonClick: callback(lesson)

export default function CourseSidebar({
  topics = [],
  completedLessons = [],
  selectedLessonId,
  onLessonClick,
}) {
  return (
    <div className="w-72 bg-[#0f172a] p-6 rounded-xl overflow-y-auto max-h-[calc(100vh-4rem)]">
      {topics.map((topic) => (
        <div key={topic.id} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
          <ul className="space-y-1">
            {(topic.lessons || []).map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isActive = selectedLessonId === lesson.id;
              return (
                <li
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson)}
                  className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                    isActive ? "bg-[#334155]" : "hover:bg-[#1e293b]"
                  }`}
                >
                  <span>{lesson.title}</span>
                  {isCompleted && (
                    <span className="text-green-400 ml-2">✔</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}