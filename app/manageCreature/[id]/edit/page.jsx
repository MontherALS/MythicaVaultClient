"use client";
// Import hooks/tools/context
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserTokenCtx } from "@/app/store/UserContext";

export default function EditCreaturePage() {
  const { id } = useParams();
  const router = useRouter();
  const { authFetch } = useContext(UserTokenCtx);

  const [formData, setFormData] = useState({
    region: "",
    name: "",
    description: "",
    race: "",
    img: "",
    story: "",
    abilities: "",
    weaknesses: "",
    tale: "",
    symbolism: "",
  });

  //Fetch creature data and put it as defult value input
  useEffect(() => {
    async function fetchCreature() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/creatures/${id}`
      );
      const data = await res.json();
      setFormData(data);
    }
    fetchCreature();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await authFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/creatures/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (res) {
      router.push(`/creatures/${id}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-[#1e1e2f] p-4 sm:p-6 md:p-10 rounded-3xl shadow-2xl text-white max-w-xl sm:max-w-2xl md:max-w-5xl mx-auto mt-8 md:mt-12"
    >
      <div className="space-y-6">
        <h2 className="col-span-1 md:col-span-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
          Edit Creature
        </h2>

        <div className="space-y-1">
          <label className="font-semibold text-base sm:text-lg">Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black resize-none text-sm sm:text-base"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-base sm:text-lg">Race</label>
          <select
            name="race"
            value={formData.race}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black text-sm sm:text-base"
            required
          >
            <option value="">Select Race</option>
            {[
              "Human",
              "God",
              "Demon",
              "Angel",
              "Undead",
              "Vampire",
              "Dragon",
              "Elf",
              "Dwarf",
              "Giant",
              "Spirit",
              "Djinn",
              "Fairy",
              "Entity",
              "Shapeshifter",
              "Beast",
            ].map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black resize-none text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black resize-none text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black resize-none text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black text-sm sm:text-base"
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
            className="w-full p-2 sm:p-3 rounded-xl bg-white text-black text-sm sm:text-base"
            required
          />

          {formData.img && (
            <img
              src={formData.img}
              alt="Preview"
              className="rounded-xl mt-2 w-full max-w-xs object-cover border-2 border-gray-500"
            />
          )}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-center mt-2">
        <button
          type="submit"
          className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-400 to-red-400 font-bold rounded-xl hover:scale-105 hover:shadow-lg transition-all text-base sm:text-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
