import "../../styles/StudentDashboard.css";

const Leaderboard = () => {
  const data = [
    {name:"Kruthi", score:95},
    {name:"Kavya", score:92},
    {name:"Tejaswini", score:90},
    {name:"Sritha", score:88},
    {name:"Ram", score:85}
  ];

  return (
    <div>
      <h1 className="page-title">🏆 Leaderboard</h1>

      <div className="leaderboard-box">

        {data.map((u,i)=>(
          <div 
            key={i} 
            className={`leader-row ${i===0?"first":""} ${i===1?"second":""} ${i===2?"third":""}`}
          >
            <div className="leader-left">
              <span className="rank">#{i+1}</span>
              <div className="avatar-small">{u.name.charAt(0)}</div>
              <span className="lname">{u.name}</span>
            </div>

            <div className="leader-right">
              <span className="lscore">{u.score}%</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Leaderboard;