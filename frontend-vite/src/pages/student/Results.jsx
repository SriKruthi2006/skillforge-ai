const Results = () => {
  return (
    <div>
      <h1 className="page-title">Exam Results</h1>

      <div className="card">
        <h3>Java Test</h3>
        <p>Score: 85%</p>
        <button>View Report</button>
      </div>

      <div className="card">
        <h3>Aptitude Test</h3>
        <p>Score: 78%</p>
        <button>View Report</button>
      </div>
    </div>
  );
};

export default Results;