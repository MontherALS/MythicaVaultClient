import React from "react";

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 space-y-12 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About MythicaVault</h1>
        <p className="text-lg text-gray-300">
          Explore the vault of forgotten legends, mysterious beings, and
          mythologies from every culture.
        </p>
      </div>

      <div className="bg-[#16161e] p-6 rounded-xl border border-gray-800 shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-purple-400">
          🧭 Our Mission
        </h2>
        <p className="text-gray-300 leading-relaxed">
          We aim to inspire creators and curious minds by archiving legendary
          creatures and ancient myths from all over the world. Whether you're a
          writer, artist, or just someone who loves folklore, MythicaVault gives
          you rich, structured knowledge at your fingertips.
        </p>
      </div>

      <div className="bg-[#16161e] p-6 rounded-xl border border-gray-800 shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-purple-400">
          🎯 Who Is It For?
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Writers looking for inspiration or deep lore.</li>
          <li>Game developers needing authentic creature references.</li>
          <li>Anyone interested in folklore and mythology.</li>
        </ul>
      </div>

      <div className="bg-[#16161e] p-6 rounded-xl border border-gray-800 shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-purple-400">
          🚀 What Makes Us Different
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Every entry includes a creature’s name, region, race, legend,
          symbolism, abilities, and weaknesses — all filtered and categorized
          for easy discovery. Our UI is built with modern web tech to make your
          journey seamless and immersive.
        </p>
      </div>

      <div className="text-center">
        <a
          href="/creatures"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-semibold text-white hover:opacity-90"
        >
          Start Exploring
        </a>
      </div>
    </section>
  );
}
