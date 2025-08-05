"use client";
// Import hooks/tools/context
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Importing region images
import Europe from "../imgs/Europe.png";
import Middle_East from "../imgs/Middle East.png";
import East_Asia from "../imgs/East Asia.png";
import Africa from "../imgs/Africa.png";
import South_America from "../imgs/South America.png";
import South_Asia from "../imgs/South Asia.png";

export default function Page() {
  //? List of regions to display with their corresponding images and URLs
  const regions = [
    { name: "Europe", img: Europe, url: "Europe" },
    { name: "Middle East", img: Middle_East, url: "Middle_East" },
    { name: "East Asia", img: East_Asia, url: "East_Asia " },
    { name: "South Asia", img: South_Asia, url: "South_Asia" },
    { name: "Africa", img: Africa, url: "Africa" },
    { name: "South America", img: South_America, url: "South_America" },
  ];

  return (
    <section className="flex flex-col justify-center items-center min-h-[60vh] py-10 px-2 text-white">
      <header className="max-w-4xl w-full flex flex-col items-center gap-4 mb-8 animate-fade-in">
        <h1 className="text-4xl p-2 sm:text-5xl font-bold text-center tracking-wider bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
          Mythic Regions
        </h1>

        <h2 className="text-xl sm:text-2xl text-center  text-gray-300 font-medium">
          Discover Legends by Origin
        </h2>
        <hr className="w-2/3 border-t-2 border-[#8ca6db] rounded-full shadow-md" />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-2 sm:p-4 w-full max-w-4xl mx-auto justify-center place-items-center animate-fade-in-up">
        {regions.map((region, i) => (
          <Link key={i} href={`/regions/${region.url}`} className="group">
            <div className="relative w-full max-w-xs sm:max-w-sm h-[200px] sm:h-[260px] rounded-2xl overflow-hidden border border-[#2d2a5b] bg-gradient-to-br from-[#15151f] via-[#1f1f35] to-[#2f2f6b] cursor-pointer transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-[#4f46e5]">
              <Image
                src={region.img}
                alt={region.name}
                width={350}
                height={350}
                className="object-cover w-full h-full group-hover:brightness-100 group-hover:blur-[1px] transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#2d2a5b]/30 to-transparent opacity-80 group-hover:opacity-50 transition duration-500" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-gradient-to-r from-[#2d2a5b]/80 to-[#5001a4]/80 text-white text-center py-2 text-lg sm:text-xl font-semibold rounded-lg group-hover:scale-105 group-hover:from-[#6b66f5]/90 group-hover:to-[#4f46e5]/90 group-hover:text-[#11111a] transition-all duration-500">
                {region.name}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}
