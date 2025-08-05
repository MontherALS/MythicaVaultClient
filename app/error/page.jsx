import React, { useEffect } from "react";
import { useContext } from "react";
import { UserTokenCtx } from "../store/UserContext";
export default function ErrorPage({ errorCode, errorMessage }) {
  const { setError } = useContext(UserTokenCtx);
  useEffect(() => {
    // Clear any previous error when this component runs
    setError(null);
  }, [setError]);
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-gray-100">
      <h1 className="text-4xl font-bold">Error {errorCode}</h1>
      <p className="mt-2">{errorMessage}</p>
      <p className="mt-4">
        Please check the URL or return to the{" "}
        <a href="/" className="text-blue-500 hover:underline">
          homepage
        </a>
        .
      </p>
    </div>
  );
}
