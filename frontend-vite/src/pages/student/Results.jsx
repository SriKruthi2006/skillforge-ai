const Results = () => {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-12">Results</h1>

      <div className="space-y-10 max-w-5xl">

        {/* Card 1 */}
        <div className="bg-gradient-to-r from-[#0f172a] to-[#111827]
        p-10 rounded-3xl flex justify-between items-center
        shadow-lg hover:shadow-2xl hover:scale-[1.02]
        transition duration-300">

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Java Test
            </h3>
            <p className="text-gray-300 text-lg">
              Score:
              <span className="ml-3 text-purple-400 font-bold text-2xl">
                85%
              </span>
            </p>
          </div>

          <button className="px-8 py-4 rounded-xl text-lg font-semibold
          bg-gradient-to-r from-purple-500 to-indigo-500
          hover:opacity-90 transition">
            View Report
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-r from-[#0f172a] to-[#111827]
        p-10 rounded-3xl flex justify-between items-center
        shadow-lg hover:shadow-2xl hover:scale-[1.02]
        transition duration-300">

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Aptitude Test
            </h3>
            <p className="text-gray-300 text-lg">
              Score:
              <span className="ml-3 text-purple-400 font-bold text-2xl">
                78%
              </span>
            </p>
          </div>

          <button className="px-8 py-4 rounded-xl text-lg font-semibold
          bg-gradient-to-r from-purple-500 to-indigo-500
          hover:opacity-90 transition">
            View Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default Results;