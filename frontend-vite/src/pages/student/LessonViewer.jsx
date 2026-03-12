import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonsByTopic } from "../../services/courseService";

const LessonViewer = () => {

  const { topicId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getLessonsByTopic(topicId)
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, [topicId]);

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Lessons
      </h1>

      {lessons.map((lesson) => (

        <div key={lesson.id} className="bg-[#0f172a] p-6 rounded-xl mb-8">

          <p className="whitespace-pre-wrap mb-6">
            {lesson.content}
          </p>

          {lesson.videoUrl && (
            <iframe
              width="100%"
              height="400"
              src={lesson.videoUrl.replace("watch?v=", "embed/")}
              title="lesson video"
              className="rounded-xl"
              allowFullScreen
            />
          )}

        </div>

      ))}

    </div>
  );
};

export default LessonViewer;