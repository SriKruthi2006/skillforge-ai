import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [savedName, setSavedName] = useState(user?.name || "Kruthi");
  const [formName, setFormName] = useState(savedName);

  const [savedImage, setSavedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    setSavedName(formName);
    if (preview) {
      setSavedImage(preview);
    }
    setIsEditing(false);
  };

  // ================= VIEW MODE =================
  if (!isEditing) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-10">My Profile</h1>

        <div className="bg-[#0f172a] p-10 rounded-3xl flex justify-between items-center">

          {/* Left Side */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-4xl font-bold">
              {savedImage ? (
                <img
                  src={savedImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                savedName?.charAt(0)
              )}
            </div>

            <h2 className="text-xl font-semibold">{savedName}</h2>
            <p className="text-gray-400">{user?.email}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Edit
            </button>
          </div>

          {/* Right Side – Course Progress */}
          <div className="w-1/2 space-y-6">
            <h3 className="text-lg font-semibold">Course Progress</h3>

            <ProgressBar title="Python" value={80} />
            <ProgressBar title="Java" value={65} />
            <ProgressBar title="Aptitude" value={75} />
          </div>

        </div>
      </div>
    );
  }

  // ================= EDIT MODE =================
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Edit Profile</h1>

      <div className="bg-[#0f172a] p-10 rounded-3xl max-w-xl space-y-6">

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center text-2xl">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              savedName?.charAt(0)
            )}
          </div>

          <label className="cursor-pointer bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 text-gray-400">Full Name</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-600 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleUpdate}
            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold"
          >
            Update
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-3 bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

/* Progress Bar Component */
const ProgressBar = ({ title, value }) => (
  <div>
    <p className="mb-2">{title}</p>
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default Profile;