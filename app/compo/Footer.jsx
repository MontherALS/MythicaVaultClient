import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 py-10 px-4  border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-center sm:text-left">
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">
            MythicaVault
          </h3>
          <p className="text-gray-400">Where myths come alive.</p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Explore</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/creatures">Creatures</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-2">Contact</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-white transition">
                mythica@vault.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-600 text-xs mt-10">
        © 2025 MythicaVault. All rights reserved.
      </div>
    </footer>
  );
}
