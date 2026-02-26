const Report = () => {
  return (
    <div>
      <h1 className="text-[32px] font-bold mb-8">Results</h1>

      <div className="bg-[#0f172a] py-5 px-5 rounded-[14px] mb-5">
        <h3>Java Test</h3>
        <p>Score: 85%</p>
        <button>View Report</button>
      </div>

      <div className="bg-[#0f172a] py-5 px-5 rounded-[14px] mb-5">
        <h3>Aptitude Test</h3>
        <p>Score: 78%</p>
        <button>View Report</button>
      </div>
    </div>
  );
};

export default Report;