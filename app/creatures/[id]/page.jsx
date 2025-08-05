"use client";
// Import hooks/tools/context
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { UserTokenCtx } from "@/app/store/UserContext";
// Import components
import CreatureActions from "@/app/compo/CreatureActions";
import ErrorPage from "@/app/error/page";
// Import images
import favOff from "@/app/imgs/star (1).png";
import favOn from "@/app/imgs/star (2).png";

export default function CreaturePage() {
  const { id } = useParams();
  const router = useRouter();
  const { userPayload, authFetch, error, setError } = useContext(UserTokenCtx);
  const [loading, setLoading] = useState(true);

  const [creature, setCreature] = useState(null);
  const [activeTab, setActiveTab] = useState("Legend");
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!id) {
      setError({
        errorCode: 400,
        errorMessage: "Invalid creature ID.",
      });
    }
    async function getCreature() {
      const res = await fetch(`http://localhost:5000/creatures/${id}`);
      if (!res.ok && res.status !== 401) {
        console.error(`Error fetching creature: ${res.statusText}`);
        setError({
          errorCode: res.status,
          errorMessage: "Creature not found or server error occured.",
        });
      }
      const data = await res.json();
      setCreature(data);
      setLoading(false);
    }
    getCreature();
  }, [id]);

  useEffect(() => {
    if (!userPayload) return;

    async function getFavCreature() {
      const token = localStorage.getItem("token");

      const res = await authFetch(`http://localhost:5000/user/favorite`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res)
        return setError({
          errorCode: 500,
          errorMessage: "Failed to fetch favorite creatures.",
        });

      const favoriteCreatures = res.favoriteCreatures;
      //get favorite creature and set isFav state
      setIsFav(favoriteCreatures.some((item) => item._id === id));
    }
    getFavCreature();
  }, [userPayload, id]);

  async function handleFavClick() {
    const token = localStorage.getItem("token");

    const newState = !isFav;

    setIsFav(newState);

    const res = await fetch(`http://localhost:5000/user/favorite/${id}`, {
      method: newState ? "PUT" : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setError({
        errorCode: res.status,
        errorMessage: "Failed to update favorite status.",
      });
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h1 className="text-5xl text-white font-mono animate-pulse">
          Loading…
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorPage
        errorCode={error.errorCode}
        errorMessage={error.errorMessage}
      />
    );
  }
  const tabs = {
    Legend: creature.story,
    Symbolism: creature.symbolism,
  };

  return (
    <main className="text-[#e5e5e5]">
      <section className="max-w-6xl mx-auto p-3 sm:p-6 flex flex-col items-center gap-6 sm:gap-10">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 bg-[#16161e] border border-[#2b2b35] rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.08)] w-full md:max-w-3xl mx-auto">
          <Image
            src={creature.img}
            alt={creature.name}
            width={400}
            height={400}
            priority
            className="rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none object-cover w-full max-w-xs md:max-w-[350px] mx-auto"
          />

          <div className="p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 w-full max-w-md">
            <p className="text-base sm:text-lg">
              <span className="text-purple-400">Name:</span>{" "}
              <span className="text-gray-200 font-semibold">
                {creature.name}
              </span>
            </p>
            <p className="text-base sm:text-lg">
              <span className="text-purple-400">Region:</span>{" "}
              <span className="text-gray-200 font-semibold">
                {creature.region}
              </span>
            </p>
            <p className="text-base sm:text-lg">
              <span className="text-purple-400">Race:</span>{" "}
              <span className="text-gray-200 font-semibold">
                {creature.race}
              </span>
            </p>
            <div>
              <p className="text-purple-400 mb-1">Description:</p>
              <div className="bg-[#0d0d0d] border-l-4 border-purple-700 p-3 sm:p-4 rounded-md shadow-inner">
                <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {creature.description}
                </p>
              </div>
            </div>
            <button
              onClick={handleFavClick}
              className="self-center mt-2 transition hover:scale-110 active:scale-95"
            >
              {userPayload && (
                <Image
                  src={isFav ? favOn : favOff}
                  width={36}
                  height={36}
                  alt="favorite"
                  className={`transition cursor-pointer drop-shadow-[0_0_5px_rgba(168,85,247,${
                    isFav ? 0.6 : 0
                  })]`}
                />
              )}
            </button>
          </div>
        </div>

        <nav className="w-full max-w-4xl bg-[#14141c] rounded-full px-2 py-1 shadow-inner">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {Object.keys(tabs).map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 sm:px-6 sm:py-2 rounded-full font-medium text-xs sm:text-base transition
                    ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md"
                        : "text-gray-400 hover:text-purple-300"
                    }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <article className="w-full max-w-4xl max-h-[400px] sm:max-h-[500px] overflow-y-auto bg-[#101017] border border-[#2b2b35] rounded-2xl p-3 sm:p-6 text-base sm:text-[22px] leading-relaxed text-[#fffbf4] hover:text-gray-100 duration-1000 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent whitespace-pre-line">
          {tabs[activeTab]}
        </article>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-15 w-full">
          <div className="bg-[#1a1a1f] border border-[#2b2b35] rounded-2xl p-3 sm:p-6 shadow-md w-full">
            <h3 className="mb-2 sm:mb-4 text-lg sm:text-xl font-semibold text-purple-400/80 tracking-wide">
              Abilities
            </h3>
            <p className="whitespace-pre-line text-sm sm:text-base">
              {creature.abilities}
            </p>
          </div>
          <div className="bg-[#1a1a1f] border border-[#2b2b35] rounded-2xl p-3 sm:p-6 shadow-md w-full">
            <h3 className="mb-2 sm:mb-4 text-lg sm:text-xl font-semibold text-rose-400/80 tracking-wide">
              Weaknesses
            </h3>
            <p className="whitespace-pre-line text-sm sm:text-base">
              {creature.weaknesses}
            </p>
          </div>
        </div>

        <CreatureActions creatureId={creature._id} />
      </section>
    </main>
  );
}
