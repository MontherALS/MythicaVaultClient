"use client";
// Import hooks/tools/context
import Link from "next/link";

import React from "react";
// Import images
import Image from "next/image";
import Hero from "../imgs/Hero.png";

export default function MainHome() {
  return (
    <>
      <section className="flex flex-col items-center py-8 px-2 sm:py-12 sm:px-4 text-white bg-[#0E0E12]">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-6 sm:gap-10">
          <div className="w-full flex justify-center">
            <Image
              src={Hero}
              alt="MythicaVault Logo"
              width={320}
              height={220}
              className="drop-shadow-xl w-full max-w-[220px] xs:max-w-xs sm:max-w-md md:max-w-lg"
              priority
            />
          </div>

          <div className="max-w-xl px-4  w-full text-center space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Discover myths, unlock legendary beings, and ignite your next
              story idea.
            </h1>

            <p className="text-gray-300 text-sm xs:text-base sm:text-lg">
              Journey through ancient symbols, forgotten stories, and mystical
              creatures from every corner of the world.
            </p>

            <div className="flex justify-center ">
              <div
                className="px-3 py-2 w-full sm:w-[300px] rounded-xl bg-gradient-to-r from-purple-700 to-blue-600 text-white text-center \
                           hover:shadow-2xl hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 duration-300"
              >
                <Link
                  href="/creatures"
                  className="font-semibold text-white hover:underline"
                >
                  Discover legendary creatures
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-8 sm:mt-16 w-full sm:w-300 h-1 bg-gradient-to-r from-[#D16BA5] via-[#0a2a1f] to-[#4A90E2] rounded-full border-0" />
      </section>

      <section className="flex justify-center py-8 sm:py-16 px-2 sm:px-6 bg-[#0E0E12] text-white">
        <div className="w-full max-w-6xl">
          <h2 className="text-xl xs:text-2xl sm:text-4xl mb-6 sm:mb-10 text-center">
            Built for Media Creators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {[
              {
                icon: "💡",
                title: "Instant Inspiration",
                desc: "One-paragraph capsules to spark new plots fast.",
              },
              {
                icon: "⭐",
                title: "Save",
                desc: "Pin creatures into custom boards for quick recall.",
              },
              {
                icon: "🖼️",
                title: "Visual Cards",
                desc: "Each creature is displayed in a clean card layout—with image and story",
              },
              {
                icon: "🌏",
                title: "Sort by region",
                desc: "Take insprition from every region and calute across the world.",
              },
            ].map(({ icon, title, desc }) => (
              <article
                key={title}
                className="relative group h-44 flex flex-col justify-between p-5
                     rounded-3xl overflow-hidden bg-[#141419]/80 backdrop-blur-lg
                     shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7)]
                     transition-transform duration-300 hover:-translate-y-2"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl p-[2px]
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500
                       bg-gradient-to-br from-[#D16BA5] via-[#4A90E2] to-[#9449ff]"
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#22222a]">
                    <span className="text-2xl">{icon}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-gray-300 leading-snug">{desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
