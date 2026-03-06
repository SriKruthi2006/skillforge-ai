const Results = () => {
  const results =
    JSON.parse(localStorage.getItem("quizResults")) || [];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">
        Quiz Results
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-400">
          No quiz attempts yet.
        </p>
      ) : (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-[#0f172a] p-6 rounded-2xl"
            >
              <h3 className="text-lg font-semibold">
                {result.course}
              </h3>
              <p className="text-gray-400">
                Score: {result.score} / {result.total}
              </p>
              <p className="text-sm text-gray-500">
                {result.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;