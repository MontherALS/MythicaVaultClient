"use client";
// Import hooks/tools/context
import { useContext, useEffect, useState } from "react";
import { UserTokenCtx } from "../store/UserContext";
// Import components
import CreaturesGrid from "../compo/CreaturesGrid";

export default function Profilepage() {
  const { authFetch } = useContext(UserTokenCtx);

  // state's
  const [ProfileData, setProfileData] = useState(null);
  const [settingsClick, setSettingsClick] = useState(false);
  const [updated, setUpdated] = useState({
    username: "",
    gender: "",
    about: "",
  });

  //Fetch user data
  useEffect(() => {
    async function getUserProfile() {
      const token = localStorage.getItem("token");
      if (!token) return console.warn("No token in localStorage");

      try {
        const resData = await authFetch("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resData) {
          console.log("Errror", resData);
        }
        if (resData) {
          setProfileData((prev) => ({
            ...prev,
            ...resData,
          }));
          setUpdated({
            username: resData.profile.username || "",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    getUserProfile();
  }, []);

  //Handle change input (profile data: name gender...)
  function handleChange(e) {
    const { name, value } = e.target;
    setUpdated((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //submit updeted data (profile data: name gender...)
  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const resData = await authFetch(`http://localhost:5000/user/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });
      if (resData) {
        const updatedProfile = resData;
        setProfileData(updatedProfile);
        setSettingsClick(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  }

  // Show loading message until profile data is fetched
  if (!ProfileData)
    return (
      <h1 className="text-5xl text-center  my-50 text-white">Loading....</h1>
    );

  return (
    <main className="min-h-screen p-2 sm:p-4 text-white">
      <section className="bg-[#1a1a1a] rounded-2xl shadow-lg px-4 py-6 sm:px-8 sm:py-8 max-w-2xl mx-auto mt-8 border border-gray-700 flex flex-col items-center w-full">
        {/* Profile info card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full max-w-xl">
          {/* Avatar */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-purple-700 to-indigo-700 rounded-full shadow-inner flex items-center justify-center text-3xl sm:text-4xl font-bold">
            {ProfileData.profile.username &&
              ProfileData.profile.username[0].toUpperCase()}
          </div>
          {/* Profile Info */}
          <div className="flex flex-col gap-4 flex-1 text-white text-base sm:text-lg w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-xl sm:text-2xl font-bold">Profile</h2>
              {!settingsClick && (
                <button
                  onClick={() => setSettingsClick(true)}
                  className="text-white text-xl hover:text-purple-400 hover:scale-110 hover:rotate-6 transition cursor-pointer"
                >
                  ⚙️
                </button>
              )}
            </div>
            {/* Username */}
            <p>
              <span className="text-gray-400 font-semibold">User Name:</span>{" "}
              {settingsClick ? (
                <input
                  type="text"
                  name="username"
                  value={updated.username}
                  onChange={handleChange}
                  className="bg-white text-black rounded-lg px-2 py-1 ml-2 text-base"
                  required
                />
              ) : (
                <span className="font-semibold">
                  {ProfileData.profile.username}
                </span>
              )}
            </p>
            {/* Settings Form */}
            {settingsClick && (
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 flex-wrap mt-2"
              >
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 hover:scale-105 px-4 py-1 rounded-lg font-semibold transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSettingsClick(false)}
                  className="bg-gray-700 hover:bg-gray-500 hover:scale-105 px-4 py-1 rounded-lg font-semibold transition duration-300"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/*Liked Creatures*/}
      <section className="mt-26">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent text-center mb-6">
          Liked Creatures
        </h2>

        {ProfileData.favoriteCreatures?.length > 0 ? (
          <CreaturesGrid creatures={ProfileData.favoriteCreatures} />
        ) : (
          <div className="bg-[#19191e] rounded-md border border-[#232334] py-2 px-2 text-center text-gray-500 shadow-sm max-w-[220px] mx-auto">
            <p className="text-xs">You haven't liked any creatures yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
