"use client";
// Import hooks/tools/context
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserTokenCtx } from "../store/UserContext";
// Import components
import CreaturesNav from "../compo/CreaturesNav";
import CreaturesGrid from "../compo/CreaturesGrid";
import Pagnation from "../compo/Pagnation";
import ErrorPage from "../error/page";

export default function Creaturespage() {
  const [isLoading, setLoading] = useState(true);
  const { error, setError } = useContext(UserTokenCtx);
  //Creatures Nav
  const [active, setActive] = useState("All");

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //fetched creatures
  const [creatures, setCreatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/creatures?page=${page}&limit=8&race=${active}`
      );
      if (!res.ok) {
        setError({
          errorCode: res.status,
          errorMessage: "Failed to fetch creatures.",
        });
        return;
      }
      const data = await res.json();
      setCreatures(data.creatures);
      setTotalPages(data.total);
      setLoading(false);
    };

    fetchData();
  }, [page, active]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h1 className="text-white font-mono text-5xl animate-pulse duration-150">
          Loading <span className="animate-bounce">...</span>
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
