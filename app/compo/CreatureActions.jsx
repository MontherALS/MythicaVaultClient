"use client";
// Import hooks/tools/context
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserTokenCtx } from "../store/UserContext";
import { useContext } from "react";
//Import components
import ErrorPage from "../error/page";

export default function CreatureActions({ creatureId }) {
  const { userPayload, authFetch, error, setError } = useContext(UserTokenCtx);

  if (userPayload?.admin === undefined) return null;
  if (userPayload?.admin === false) return null;

  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this page?"
    );
    if (!confirm) {
      return;
    }
    const token = localStorage.getItem("token");
    const res = await authFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/creatures/${creatureId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res) {
      setError({
        errorCode: 500,
        errorMessage: "Failed to delete creature.",
      });
    }
    router.push("/");
  };

  if (error) {
    return (
      <ErrorPage
        errorCode={error.errorCode}
        errorMessage={error.errorMessage}
      />
    );
  }
  return (
    <div className="flex gap-5 ">
      <Link
        className="bg-blue-900  rounded-3xl hover:bg-blue-500  hover:scale-105 duration-500 cursor-pointer text-white p-2 px-5"
        href={`/manageCreature/${creatureId}/edit`}
      >
        Edit
      </Link>

      <button
        className="bg-red-900  rounded-3xl hover:bg-red-500  hover:scale-105 duration-500 cursor-pointer text-white py-2 px-5"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
