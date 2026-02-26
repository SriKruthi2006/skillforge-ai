const TestPage = () => {
  return (
    <div className="flex-1 p-14">

      <h1 className="text-5xl font-bold mb-14">Upcoming Tests</h1>

      <div className="space-y-10 max-w-5xl">

        {/* Test 1 */}
        <div className="bg-[#0f172a] rounded-3xl p-10 flex justify-between items-center shadow-lg">

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Aptitude Grand Test
            </h3>
            <p className="text-gray-300 text-lg">Date: 25 March</p>
            <p className="text-gray-300 text-lg">Duration: 60 mins</p>
          </div>

          <button className="
          px-10 py-4
          rounded-xl
          text-lg font-semibold
          bg-gradient-to-r from-purple-500 to-indigo-500
          hover:scale-105 transition">
            Start Test
          </button>
        </div>

        {/* Test 2 */}
        <div className="bg-[#0f172a] rounded-3xl p-10 flex justify-between items-center shadow-lg">

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Java Mock Test
            </h3>
            <p className="text-gray-300 text-lg">Date: 28 March</p>
            <p className="text-gray-300 text-lg">Duration: 90 mins</p>
          </div>

          <button className="
          px-10 py-4
          rounded-xl
          text-lg font-semibold
          bg-gradient-to-r from-purple-500 to-indigo-500
          hover:scale-105 transition">
            Start Test
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestPage;