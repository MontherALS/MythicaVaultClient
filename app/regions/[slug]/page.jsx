"use client";
// Import hooks/tools/context
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserTokenCtx } from "@/app/store/UserContext";
import { useContext } from "react";
// Import components
import CreaturesGrid from "@/app/compo/CreaturesGrid";
import CreaturesNav from "@/app/compo/CreaturesNav";
import Pagnation from "@/app/compo/Pagnation";
import ErrorPage from "@/app/error/page";

export default function regionSlug() {
  const [loading, setLoading] = useState(true);

  const { error, setError } = useContext(UserTokenCtx);

  const params = useParams();
  const rawSlug = params.slug;
  let region = rawSlug;

  switch (rawSlug) {
    case "Middle_East":
      region = "Middle East";
      break;
    case "East_Asia":
      region = "East Asia";
      break;
    case "South_Asia":
      region = "South Asia";
      break;
    case "South_America":
      region = "South America";
      break;
  }

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [creatures, setCreatures] = useState([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/creatures?page=${page}&limit=8&region=${region}&race=${active}`
        );
        if (!res.ok) {
          setError({
            errorCode: 404,
            errorMessage: "Failed to fetch creatures.",
          });
        }
        const data = await res.json();
        setTotalPages(data.total);
        setCreatures(data.creatures);
        setLoading(false);
      } catch (err) {
        setError({
          errorCode: 500,
          errorMessage: "An unexpected error occurred.",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [region, active]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h1 className="text-white font-mono text-5xl animate-pulse">
          Loading...
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

  return (
    <>
      <CreaturesNav active={active} setActive={setActive} setPage={setPage} />

      <CreaturesGrid creatures={creatures} />

      <Pagnation totalPages={totalPages} setPage={setPage} page={page} />
    </>
  );
}
