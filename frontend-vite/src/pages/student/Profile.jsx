import { useState } from "react";
import "../../styles/StudentDashboard.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open,setOpen]=useState(false);
  const [name,setName]=useState(user?.name);
  const [email,setEmail]=useState(user?.email);

  const save = ()=>{
    const updated={...user,name,email};
    localStorage.setItem("user",JSON.stringify(updated));
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card-modern">
        <div className="profile-left">
          <div className="profile-avatar">{name?.charAt(0)}</div>
          <h2>{name}</h2>
          <p className="email">{email}</p>
          <button className="edit-btn" onClick={()=>setOpen(true)}>Edit</button>
        </div>

        <div className="profile-right">
  <h3>Course Progress</h3>

  <div className="progress-row">
    <span>Python</span>
    <div className="progress-bar">
      <div className="progress-fill" style={{width:"80%"}}></div>
    </div>
  </div>

  <div className="progress-row">
    <span>Java</span>
    <div className="progress-bar">
      <div className="progress-fill" style={{width:"60%"}}></div>
    </div>
  </div>

  <div className="progress-row">
    <span>Aptitude</span>
    <div className="progress-bar">
      <div className="progress-fill" style={{width:"70%"}}></div>
    </div>
  </div>
</div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="modal">
          <div className="modal-box">
            <h2>Edit Profile</h2>
            <input value={name} onChange={(e)=>setName(e.target.value)} />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button onClick={save}>Save</button>
            <button onClick={()=>setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;