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
      <h1 className="text-[32px] font-bold mb-8">🏆 Leaderboard</h1>

      <div className="bg-[#0f172a] py-[30px] px-[30px] rounded-[18px] w-[650px] shadow-[0_0_40px_rgba(108,99,255,0.15)]">

        {data.map((u,i)=>(
          <div 
            key={i} 
            className={`flex justify-between items-center py-4 px-4 border-b border-[#1e293b] transition-all duration-300 hover:bg-[#111827] hover:rounded-[10px] ${i===0?"bg-gradient-to-r from-[#ffd70022] to-[#020617]":""} ${i===1?"bg-gradient-to-r from-[#c0c0c022] to-[#020617]":""} ${i===2?"bg-gradient-to-r from-[#cd7f3222] to-[#020617]":""}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#6c63ff] w-[35px]">#{i+1}</span>
              <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#6c63ff] to-[#7c3aed] flex items-center justify-center font-bold">{u.name.charAt(0)}</div>
              <span className="text-base">{u.name}</span>
            </div>

            <div>
              <span className="text-[18px] font-bold text-green-500">{u.score}%</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Leaderboard;