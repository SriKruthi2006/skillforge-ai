import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTopicsByCourse,
  getLessonsByTopic,
  getCourseProgressDetails,
  markLessonComplete,
  getCourse,
} from "../../services/courseService";
import CourseSidebar from "../../components/CourseSidebar";
import LessonContent from "../../components/LessonContent";
import ProgressBar from "../../components/ui/ProgressBar";

const CoursePlayer = () => {
  const { courseId } = useParams();

  const [courseTitle, setCourseTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [lessonsMap, setLessonsMap] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressDetails, setProgressDetails] = useState({ completedLessons: 0, totalLessons: 0, progress: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const courseRes = await getCourse(courseId);
        setCourseTitle(courseRes.data.title || "");
      } catch (e) {
        console.error("could not fetch course info", e);
      }

      try {
        const topicsRes = await getTopicsByCourse(courseId);
        const t = topicsRes.data || [];
        setTopics(t);

        const lessonsObj = {};
        await Promise.all(
          t.map(async (topic) => {
            const lres = await getLessonsByTopic(topic.id);
            lessonsObj[topic.id] = lres.data || [];
          })
        );
        setLessonsMap(lessonsObj);
      } catch (e) {
        console.error("failed to load topics/lessons", e);
      }

      try {
        const progRes = await getCourseProgressDetails(courseId);
        setProgressDetails(progRes.data);
        setCompletedLessons(progRes.data.completedLessonIds || []);
      } catch (e) {
        console.error("could not load progress", e);
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
      
      // Update progress details
      const updatedProgress = await getCourseProgressDetails(courseId);
      setProgressDetails(updatedProgress.data);
    } catch (e) {
      console.error("failed to mark complete", e);
    }
  };

  const allLessons = Object.values(lessonsMap).flat();
  const totalLessons = progressDetails.totalLessons || 0;
  const progressPercent = progressDetails.progress || 0;

  if (loading) {
    return <p className="text-white p-10">Loading course...</p>;
  }

  return (
    <div className="flex h-full text-white">
      <CourseSidebar
        topics={topics.map((t) => ({
          ...t,
          lessons: lessonsMap[t.id] || [],
        }))}
        completedLessons={completedLessons}
        selectedLessonId={selectedLesson?.id}
        onLessonClick={handleLessonClick}
      />

      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
          <ProgressBar value={progressDetails.completedLessons} max={totalLessons} />
        </div>

        <LessonContent
          lesson={selectedLesson}
          isCompleted={completedLessons.includes(selectedLesson?.id)}
          onMarkComplete={handleMarkComplete}
        />
      </div>
    </div>
  );
};

export default CoursePlayer;
