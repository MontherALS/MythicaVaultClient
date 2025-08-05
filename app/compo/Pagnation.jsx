import React from "react";

export default function Pagnation({ totalPages, setPage, page }) {
  return (
    <div className="flex w-full justify-center text-xl gap-3 mb-12 ">
      {Array.from({ length: totalPages }).map((_, i) => {
        const isActive = page === i + 1;
        return (
          <button
            onClick={() => {
              setPage(i + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            key={i}
            className={`
              px-4 py-2 font-mono rounded-full border transition-all duration-300 shadow-sm
              ${
                isActive
                  ? "bg-gradient-to-r from-[#7b4397] to-[#3b0bda] text-white border-[#a16dd4] scale-110 shadow-lg"
                  : "bg-[#232334]/80 text-[#d1c4e9] border-[#232334] hover:bg-gradient-to-r hover:from-[#7b4397] hover:to-[#2424dc] hover:text-white hover:border-[#a16dd4] hover:scale-105 hover:shadow-md"
              }
            `}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
