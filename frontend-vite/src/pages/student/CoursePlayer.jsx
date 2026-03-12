import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTopicsByCourse,
  getLessonsByTopic,
  getCourseProgressDetails,
  markLessonComplete,
  getCourse,
} from "../../services/courseService";

import CourseModules from "../../components/CourseModules";
import LessonViewer from "../../components/LessonViewer";

const CoursePlayer = () => {
  const { courseId } = useParams();

  const [courseTitle, setCourseTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [lessonsMap, setLessonsMap] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  const [progressDetails, setProgressDetails] = useState({
    completedLessons: 0,
    totalLessons: 0,
    progress: 0,
  });

  const [loading, setLoading] = useState(true);

  // fullscreen state shared with lesson viewer
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const courseRes = await getCourse(courseId);
        setCourseTitle(courseRes.data.title || "");
      } catch (e) {
        console.error(e);
      }

      try {
        const topicsRes = await getTopicsByCourse(courseId);
        const t = topicsRes.data || [];
        setTopics(t);

        const lessonsObj = {};

        await Promise.all(
          t.map(async (topic) => {
            const res = await getLessonsByTopic(topic.id);
            lessonsObj[topic.id] = res.data || [];
          })
        );

        setLessonsMap(lessonsObj);

        if (t.length > 0 && lessonsObj[t[0].id]?.length > 0) {
          setSelectedLesson(lessonsObj[t[0].id][0]);
        }

      } catch (e) {
        console.error(e);
      }

      try {
        const progRes = await getCourseProgressDetails(courseId);
        setProgressDetails(progRes.data);
        setCompletedLessons(progRes.data.completedLessonIds || []);
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    };

    load();
  }, [courseId]);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleMarkComplete = async (lesson) => {
    try {
      await markLessonComplete(lesson.id);

      setCompletedLessons((prev) => [...prev, lesson.id]);

      const updated = await getCourseProgressDetails(courseId);
      setProgressDetails(updated.data);

    } catch (e) {
      console.error(e);
    }
  };

  const getAllLessons = () => {
    return Object.values(lessonsMap).flat();
  };

  const handleNextLesson = () => {
    const all = getAllLessons();
    const index = all.findIndex((l) => l.id === selectedLesson?.id);

    if (index < all.length - 1) {
      setSelectedLesson(all[index + 1]);
    }
  };

  const handlePrevLesson = () => {
    const all = getAllLessons();
    const index = all.findIndex((l) => l.id === selectedLesson?.id);

    if (index > 0) {
      setSelectedLesson(all[index - 1]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        Loading course...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-slate-50">

      {/* Hide header in fullscreen */}
      {!fullscreen && (
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-6 shadow-lg">
          <div className="flex items-start justify-between max-w-7xl mx-auto">

            <div className="flex-1">

              <div className="flex items-center gap-2 mb-3 text-sm text-blue-100">
                <span>My Courses</span>
                <span>›</span>
                <span>{courseTitle}</span>
              </div>

              <h1 className="text-4xl font-bold mb-3">
                {courseTitle}
              </h1>

              <div className="flex items-center gap-6 text-sm">

                <div className="flex items-center gap-2">
                  <span>👁</span>
                  <span>{progressDetails.totalLessons} lessons</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>📄</span>
                  <span>Beginner</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>🏷</span>
                  <span>By Admin</span>
                </div>

              </div>

            </div>

            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-md rounded-lg px-5 py-3">
                <div className="text-sm text-blue-100 mb-1">
                  Your Progress
                </div>
                <div className="text-3xl font-bold">
                  {progressDetails.progress}%
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN CONTENT */}

      <div className="flex flex-1 overflow-hidden gap-6 p-6 max-w-7xl mx-auto w-full">

        {/* LESSON SIDEBAR (always visible) */}

        <div className="w-80 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col overflow-hidden">

          <div className="border-b p-4 font-bold text-slate-700">
            COURSE CONTENT
          </div>

          <CourseModules
            topics={topics.map((t) => ({
              ...t,
              lessons: lessonsMap[t.id] || [],
            }))}
            completedLessons={completedLessons}
            selectedLessonId={selectedLesson?.id}
            onLessonClick={handleLessonClick}
          />

        </div>

        {/* LESSON CONTENT */}

        <div className="flex-1 overflow-hidden">

          <LessonViewer
            lesson={selectedLesson}
            isCompleted={completedLessons.includes(selectedLesson?.id)}
            onMarkComplete={handleMarkComplete}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
            courseProgress={progressDetails}
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
          />

        </div>

      </div>

    </div>
  );
};

export default CoursePlayer;