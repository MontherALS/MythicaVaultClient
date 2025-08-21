import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CreaturesGrid({ creatures }) {
  if (!creatures || creatures.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <div className="bg-[#191926] border border-[#232334] rounded-lg px-6 py-4 shadow text-gray-400 text-sm lg:text-2xl font-mono">
          No creatures found.
        </div>
      </div>
    );
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 py-8 sm:py-10 md:py-12 lg:py-14">
      {creatures.map((creature) => (
        <div
          key={creature._id}
          className="bg-[#16161e]  text-white p-4 rounded-2xl
           shadow-md border border-gray-800 
           hover:scale-105 transition-all duration-500"
        >
          <div className="h-[400px] sm:h-[375px] md:h-[400px] lg:h-[520px]  rounded-xl overflow-hidden group">
            <Image
              src={creature.img}
              alt={creature.name}
              width={500}
              height={500}
              priority
              className="w-full h-full  object-center rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mt-4 space-y-2 font-sans">
            <h2 className="text-xl">
              <span className="text-purple-400">Name:</span>{" "}
              <span className="font-semibold ">{creature.name}</span>
            </h2>

            <p className="text-xl">
              <span className="text-purple-400">Region:</span>{" "}
              <span className="text-gray-300">{creature.region}</span>
            </p>

            <p className="text-xl">
              <span className="text-purple-400 ">Race:</span>{" "}
              <span className="text-gray-300">{creature.race}</span>
            </p>

            <p className="text-xl text-gray-400 line-clamp-3">
              <span className="text-purple-400 ">Description:</span>{" "}
              {creature.description}
            </p>

            <div className="flex justify-center mt-4">
              <Link href={`/creatures/${creature._id}`}>
                <button className="px-4 py-2 bg-gradient-to-r cursor-pointer from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 hover:text-black transition">
                  View More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
