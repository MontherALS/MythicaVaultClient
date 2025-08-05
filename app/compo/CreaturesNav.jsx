import React from "react";

export default function CreaturesNav({ setActive, active, setPage }) {
  const races = [
    "All",
    "Beast",
    "Demon",
    "Djinn",
    "Angel",
    "Dragon",
    "Dwarf",
    "Elf",
    "Fairy",
    "Giant",
    "Human",
    "God",
    "Spirit",
    "Undead",
    "Entity",
  ];

  return (
    <nav className="mt-6 flex justify-center w-full">
      <ul className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 sm:gap-3 p-2 px-2 sm:px-4 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-cyan-900 shadow-md w-full max-w-2xl xl:max-w-6xl overflow-x-auto md:overflow-x-visible scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
        {races.map((race, i) => (
          <li key={i} className="flex-shrink-0">
            <button
              name={race}
              onClick={() => {
                setActive(race);
                setPage(1);
              }}
              className={`px-3 py-1 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 rounded-full whitespace-nowrap
                ${
                  active === race
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg scale-105 border-2 border-cyan-400"
                    : "text-gray-300 hover:text-white hover:scale-105 border border-transparent"
                }`}
            >
              {race}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
