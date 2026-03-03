import { useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Python",
    description: "Learn Python from basics to advanced.",
    lessons: [
      { title: "Variables", video: true, assignment: true },
      { title: "Loops", video: true, assignment: true },
      { title: "Functions", video: true, assignment: true },
      { title: "OOP", video: true, assignment: true },
    ],
  },
  {
    id: 2,
    title: "Java",
    description: "Master Java programming.",
    lessons: [
      { title: "Basics", video: true, assignment: true },
      { title: "Collections", video: true, assignment: true },
    ],
  },
  {
    id: 3,
    title: "Aptitude",
    description: "Improve logical and quantitative skills.",
    lessons: [
      { title: "Percentages", video: true, assignment: true },
      { title: "Time & Work", video: true, assignment: true },
    ],
  },
  {
    id: 4,
    title: "Logical Reasoning",
    description: "Sharpen reasoning ability.",
    lessons: [
      { title: "Puzzles", video: true, assignment: true },
      { title: "Seating Arrangement", video: true, assignment: true },
    ],
  },
];

const CoursePlayer = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) {
    return <h1 className="text-2xl">Course Not Found</h1>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
      <p className="text-gray-400 mb-8">{course.description}</p>

      <div className="bg-[#0f172a] p-6 rounded-2xl space-y-4">
        {course.lessons.map((lesson, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
          >
            <span>{lesson.title}</span>

            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm">
                Watch Video
              </button>
              <button className="px-4 py-2 bg-green-600 rounded-lg text-sm">
                Assignment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlayer;