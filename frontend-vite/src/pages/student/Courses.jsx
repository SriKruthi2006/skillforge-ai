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
      <h1 className="page-title">Courses</h1>

      {!selected ? (
        <div className="courses-grid">
          {Object.keys(data).map((s,i)=>(
            <div key={i} className="course-card"
                 onClick={()=>setSelected(s)}>
              <h3>{s}</h3>
              <div className="progress-bar">
                <div className="progress-fill"
                  style={{width:data[s].progress+"%"}}></div>
              </div>
              <p>{data[s].progress}% completed</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button className="back-btn" onClick={()=>setSelected(null)}>← Back</button>
          <h2>{selected} Topics</h2>

          {data[selected].topics.map((t,i)=>(
            <div className="topic-card" key={i}>
              <h4>{t}</h4>
              <div className="topic-actions">
                <button>Video</button>
                <button>Assignment</button>
                <span className={i<3?"done":"pending"}>
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