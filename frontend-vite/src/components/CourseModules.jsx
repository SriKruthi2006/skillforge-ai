import { useState } from 'react';

const CourseModules = ({ topics = [], completedLessons = [], selectedLessonId, onLessonClick }) => {
  const [expandedTopics, setExpandedTopics] = useState(new Set([topics[0]?.id]));

  const toggleTopic = (topicId) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 space-y-3">
      {topics.map((topic) => {
        const completedCount = (topic.lessons || []).filter(l => isLessonCompleted(l.id)).length;
        const totalCount = (topic.lessons || []).length;
        const topicProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        
        return (
          <div key={topic.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Topic Header */}
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-slate-900 font-medium border-b border-slate-100"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    expandedTopics.has(topic.id) ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="text-left min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">{topic.title}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {completedCount} of {totalCount} lessons
                  </div>
                </div>
              </div>
              <div className="ml-2 text-right flex-shrink-0">
                <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 rounded-full"
                    style={{ width: `${topicProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-600 mt-1 block">{topicProgress}%</span>
              </div>
            </button>

            {/* Lessons */}
            {expandedTopics.has(topic.id) && (
              <div className="bg-slate-50 space-y-1 py-2 px-2">
                {(topic.lessons || []).map((lesson, index) => {
                  const completed = isLessonCompleted(lesson.id);
                  const isActive = selectedLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onLessonClick(lesson)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 flex items-start gap-3 group ${
                        isActive
                          ? 'bg-white border-l-4 border-blue-600 shadow-sm'
                          : 'border-l-4 border-transparent hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Lesson Number */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        completed
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-300 text-slate-700 group-hover:bg-slate-400'
                      }`}>
                        {completed ? (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Lesson Title & Duration */}
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-medium truncate block ${
                          isActive ? 'text-blue-600' : 'text-slate-900 group-hover:text-slate-700'
                        }`}>
                          {lesson.title}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5">
                          {completed && <span className="text-green-600 font-medium">Completed</span>}
                        </span>
                      </div>

                      {/* Right Arrow */}
                      {isActive && (
                        <svg className="w-4 h-4 flex-shrink-0 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseModules;
