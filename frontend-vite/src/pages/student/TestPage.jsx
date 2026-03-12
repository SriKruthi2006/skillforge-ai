import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizData from "../../data/quizData";
import { getCourse } from "../../services/courseService";

const TestPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCourse(courseId);
        setCourseName(res.data.title || "");
      } catch (e) {
        console.error("failed to load course info", e);
      }
    };
    fetch();
  }, [courseId]);

  const questions = quizData[courseName] || [];

  // ⏱ Timer Logic
  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setFinished(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished]);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  // 💾 Store result when finished
  useEffect(() => {
    if (finished && started) {
      const results =
        JSON.parse(localStorage.getItem("quizResults")) || [];

      results.push({
        course: courseName,
        score,
        total: questions.length,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "quizResults",
        JSON.stringify(results)
      );
    }
  }, [finished]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!courseName) {
    return <h1>Course Not Found</h1>;
  }

  // ================= START SCREEN =================
  if (!started) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          {courseName} Quiz
        </h1>
        <p className="text-gray-400 mb-8">
          10 Questions | 10 Minutes
        </p>

        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 bg-purple-600 rounded-xl text-lg"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // ================= RESULT SCREEN =================
  if (finished) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Quiz Completed 🎉
        </h1>
        <p className="text-2xl text-purple-400">
          You scored {score} out of {questions.length}
        </p>

        <button
          onClick={() => navigate("/student/results")}
          className="mt-6 px-6 py-2 bg-purple-600 rounded-lg"
        >
          View Results
        </button>
      </div>
    );
  }

  // ================= QUIZ SCREEN =================
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {courseName} Quiz
        </h1>
        <span className="text-red-400 font-semibold">
          ⏱ {formatTime()}
        </span>
      </div>

      <div className="bg-[#0f172a] p-8 rounded-2xl">
        <h2 className="text-xl mb-6">
          Q{current + 1}. {questions[current].question}
        </h2>

        <div className="space-y-4">
          {questions[current].options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelected(option)}
              className={`p-4 rounded-xl cursor-pointer ${
                selected === option
                  ? "bg-purple-600"
                  : "bg-[#1e293b] hover:bg-[#334155]"
              }`}
            >
              {option}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-6 px-6 py-2 bg-purple-600 rounded-lg"
        >
          {current + 1 < questions.length ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default TestPage;
