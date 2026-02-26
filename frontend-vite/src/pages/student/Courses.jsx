import { useState } from "react";

const data = {
  Python:{
    progress:80,
    topics:[
      "Introduction","Variables","Loops","Functions",
      "OOP","File Handling","Modules","Django"
    ]
  },
  Java:{
    progress:60,
    topics:[
      "Basics","OOP","Collections","Exception Handling",
      "Multithreading","JDBC","Spring Boot","Microservices"
    ]
  },
  Aptitude:{
    progress:70,
    topics:[
      "Number System","Profit Loss","Time & Work",
      "Probability","Permutation","Ratio","Averages"
    ]
  },
  "Logical Reasoning":{
    progress:55,
    topics:[
      "Coding Decoding","Blood Relations","Directions",
      "Seating Arrangement","Syllogism","Puzzles"
    ]
  }
};

const Courses = () => {
  const [selected,setSelected]=useState(null);

  return (
    <div>
      <h1 className="text-[32px] font-bold mb-8">Courses</h1>

      {!selected ? (
        <div className="grid grid-cols-3 gap-5">
          {Object.keys(data).map((s,i)=>(
            <div key={i} className="bg-[#0f172a] py-5 px-5 rounded-[16px] cursor-pointer"
                 onClick={()=>setSelected(s)}>
              <h3>{s}</h3>
              <div className="h-2 bg-[#1e293b] rounded-[10px] my-2.5">
                <div className="h-2 bg-gradient-to-r from-[#6c63ff] to-[#7c3aed] rounded-[10px]"
                  style={{width:data[s].progress+"%"}}></div>
              </div>
              <p>{data[s].progress}% completed</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button className="py-2 px-3.5 bg-[#6c63ff] border-none rounded-2 text-white mb-4" onClick={()=>setSelected(null)}>← Back</button>
          <h2 className="text-2xl font-bold mb-4">{selected} Topics</h2>

          {data[selected].topics.map((t,i)=>(
            <div className="bg-[#0f172a] py-5 px-5 rounded-[14px] mt-4 flex justify-between items-center" key={i}>
              <h4>{t}</h4>
              <div className="flex gap-2.5">
                <button className="mr-2.5 py-1.5 px-3 border-none rounded-2 bg-[#6c63ff] text-white">Video</button>
                <button className="py-1.5 px-3 border-none rounded-2 bg-[#6c63ff] text-white">Assignment</button>
                <span className={i<3?"text-green-500 font-bold":"text-amber-500 font-bold"}>
                  {i<3?"Completed":"Pending"}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Courses;