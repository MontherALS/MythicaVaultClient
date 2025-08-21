"use client";
// Import hooks/tools/context
import { use, useState } from "react";
import { UserTokenCtx } from "@/app/store/UserContext";
import { useContext } from "react";

export default function AddCreaturePage() {
  const { authFetch, userPayload } = useContext(UserTokenCtx);
  //State's
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    race: "",
    description: "",
    img: "",
    story: "",
    symbolism: "",
    tale: "",
    abilities: "",
    weaknesses: "",
  });

  const [message, setMessage] = useState();

  //Handle change inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //post fetch
  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await authFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/creature/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (res) {
      setMessage(true);
      setFormData({
        region: "",
        name: "",
        description: "",
        race: "",
        img: "",
        story: ``,
        abilities: "",
        weaknesses: "",
        tale: "",
        symbolism: "",
      });
    } else {
      setMessage(null);
    }
  }
  // If user is not admin, return access denied message
  if (!userPayload.admin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-8 py-6 rounded-2xl shadow-lg flex flex-col items-center">
          <svg
            className="w-12 h-12 mb-3 text-white/80"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-lg font-medium">
            You are not authorized to add creatures.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Submit Result Message  */}
      {message ? (
        <div className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto mt-6 px-2 sm:px-6">
          <div className="bg-green-500 text-white font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md text-center text-base sm:text-lg">
            ✅ Creature added !
          </div>
        </div>
      ) : message === false ? (
        <div className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto mt-6 px-2 sm:px-6">
          <div className="bg-red-500 text-white font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md text-center text-base sm:text-lg">
            ❌ Somethine went wrong, try to reload the page !
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-gradient-to-br mb-8 from-[#1a1027] via-black to-[#1a1027] p-4 sm:p-6 md:p-10 rounded-3xl shadow-2xl text-white max-w-xl sm:max-w-2xl md:max-w-5xl mx-auto mt-8 md:mt-12 border-2 border-[#201a2b]"
      >
        <div className="space-y-6">
          <h2 className="col-span-1 md:col-span-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Add Creature
          </h2>

          <div className="space-y-1">
            <label
              htmlFor="region"
              className="font-semibold text-base sm:text-lg"
            >
              Region
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            >
              <option value="">Select Region</option>
              <option value="Europe">Europe</option>
              <option value="Middle East">Middle East</option>
              <option value="East Asia">East Asia</option>
              <option value="South Asia">South Asia</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">
              Creature Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Basilisk"
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="A legendary serpent or dragon-like creature..."
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">Race</label>
            <select
              name="race"
              value={formData.race}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            >
              <option value="">Select Race</option>
              <option value="Human">Human</option>
              <option value="God">God</option>
              <option value="Demon">Demon</option>
              <option value="Angel">Angel</option>
              <option value="Undead">Undead</option>
              <option value="Vampire">Vampire</option>
              <option value="Dragon">Dragon</option>
              <option value="Elf">Elf</option>
              <option value="Dwarf">Dwarf</option>
              <option value="Giant">Giant</option>
              <option value="Spirit">Spirit</option>
              <option value="Djinn">Djinn</option>
              <option value="Fairy">Fairy</option>
              <option value="Entity">Entity</option>
              <option value="Shapeshifter">Shapeshifter</option>
              <option value="Beast">Beast</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">Legend</label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              rows={4}
              placeholder="Long lore or background story..."
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />
          </div>

          {/* <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">Tale</label>
            <textarea
              name="tale"
              value={formData.tale}
              onChange={handleChange}
              rows={4}
              placeholder="Specific tale involving this creature..."
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
            />
          </div> */}

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">
              Symbolism
            </label>
            <textarea
              name="symbolism"
              value={formData.symbolism}
              onChange={handleChange}
              rows={4}
              placeholder="What does the creature represent?"
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">
              Abilities
            </label>
            <input
              name="abilities"
              value={formData.abilities}
              onChange={handleChange}
              placeholder="Death Gaze, Venom Bite..."
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">
              Weaknesses
            </label>
            <input
              name="weaknesses"
              value={formData.weaknesses}
              onChange={handleChange}
              placeholder="Mirror Reflection, Rooster’s Crow..."
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-base sm:text-lg">
              Image URL
            </label>
            <input
              name="img"
              value={formData.img}
              onChange={handleChange}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 sm:p-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base"
              required
            />

            {formData.img && (
              <img
                src={formData.img}
                alt="Preview"
                className="rounded-xl mt-2 w-full max-w-xs object-cover border-2 border-purple-600"
              />
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-cyan-500 font-bold rounded-xl hover:scale-105 hover:shadow-lg transition-all text-base sm:text-lg"
          >
            Submit Creature
          </button>
        </div>
      </form>
    </>
  );
}
