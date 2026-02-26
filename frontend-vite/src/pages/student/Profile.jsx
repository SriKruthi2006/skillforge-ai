const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex-1 p-14">

      <h1 className="text-4xl font-bold mb-12">My Profile</h1>

      <div className="bg-[#0f172a] rounded-3xl p-12 flex items-center gap-16 shadow-xl max-w-5xl">

        {/* LEFT */}
        <div className="flex flex-col items-center w-64">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 
          flex items-center justify-center text-4xl font-bold mb-4">
            {user?.name?.charAt(0)}
          </div>

          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-400 mb-6">{user?.email}</p>

          <button className="
          px-8 py-3
          rounded-xl
          bg-gradient-to-r from-purple-500 to-indigo-500
          text-white font-semibold
          hover:scale-105 transition">
            Edit Profile
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <h3 className="text-xl mb-6 font-semibold">Course Progress</h3>

          {/* Python */}
          <p className="mb-2">Python</p>
          <div className="w-full bg-[#1e293b] h-3 rounded-full mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full w-[85%]"></div>
          </div>

          {/* Java */}
          <p className="mb-2">Java</p>
          <div className="w-full bg-[#1e293b] h-3 rounded-full mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full w-[70%]"></div>
          </div>

          {/* Aptitude */}
          <p className="mb-2">Aptitude</p>
          <div className="w-full bg-[#1e293b] h-3 rounded-full">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full w-[78%]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;