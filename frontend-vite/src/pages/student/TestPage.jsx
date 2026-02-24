const TestPage = () => {
  return (
    <div>
      <h1 className="page-title">Upcoming Tests</h1>

      <div className="card">
        <h3>Aptitude Grand Test</h3>
        <p>Date: 25 March</p>
        <p>Duration: 60 mins</p>
        <button>Start Test</button>
      </div>

      <div className="card">
        <h3>Java Mock Test</h3>
        <p>Date: 28 March</p>
        <p>Duration: 90 mins</p>
        <button>Start Test</button>
      </div>
    </div>
  );
};

export default TestPage;