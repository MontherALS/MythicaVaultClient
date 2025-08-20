"use client";
// Import hooks/tools/context
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserTokenCtx } from "../store/UserContext";
import { useRouter } from "next/navigation";
// Import images
import icon from "@/app/imgs/icon.png";
import Image from "next/image";

export default function MyNav() {
  const pathname = usePathname();

  const router = useRouter();
  const { userPayload, isLoading, setUserPayload } = useContext(UserTokenCtx);
  const [links, setLinks] = useState([
    { name: "Home", href: "/" },
    { name: "Creatures", href: "/creatures" },
    { name: "Regions", href: "/regions" },
    { name: "About", href: "/about" },
  ]);

  useEffect(() => {
    if (userPayload) {
      const updatedLinks = [
        { name: "Home", href: "/" },
        { name: "Creatures", href: "/creatures" },
        { name: "Regions", href: "/regions" },
        { name: "Profile", href: "/profile" },
        { name: "About", href: "/about" },
      ];

      if (userPayload.admin) {
        updatedLinks.push({
          name: "Add Creature",
          href: "/manageCreature/addcreature",
        });
      }

      setLinks(updatedLinks);
    }
  }, [userPayload]);

  function handleLogout() {
    const confirmLogOut = window.confirm("Are you sure?");
    if (confirmLogOut) {
      localStorage.removeItem("token");
      setUserPayload(null);
      setLinks([
        { name: "Home", href: "/" },
        { name: "Creatures", href: "/creatures" },
        { name: "Regions", href: "/regions" },
        { name: "About", href: "/about" },
      ]);
      router.push("/");
    }
  }
  if (isLoading) return null;
  return (
    <header className="bg-transparent w-full">
      <nav className="flex justify-center items-center w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl px-3 sm:px-6 py-3 sm:py-4 my-2 sm:my-4 rounded-2xl sm:rounded-3xl backdrop-blur-xl bg-black/40 border border-white/5 shadow-[0_0_20px_rgba(168,85,247,0.08)] ring-1 ring-white/5">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-2 sm:mb-0">
            <Image
              src={icon}
              alt="MythicaVault Logo"
              width={90}
              height={60}
              className="transition-transform hover:scale-105 hover:rotate-1 duration-300"
            />
          </Link>

          {/* Links */}
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 text-base sm:text-[1.7rem] font-medium w-full sm:w-auto">
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <li key={i}>
                  <Link
                    href={link.href}
                    className={`transition duration-200 px-2 py-1 sm:px-0 sm:py-0 rounded-lg sm:rounded-none
                      ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent"
                          : "text-white hover:text-purple-400"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {userPayload ? (
            <button
              className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-base sm:text-xl bg-red-800/50 hover:bg-red-800/80 hover:scale-105 transition-all cursor-pointer duration-300 mt-2 sm:mt-0"
              onClick={handleLogout}
            >
              <span>Log out</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl rounded-full bg bg-gradient-to-tl from-blue-600 to-purple-700 hover:scale-105 transition-all cursor-pointer duration-300 mt-2 sm:mt-0">
              <Link href="/login">Login</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
