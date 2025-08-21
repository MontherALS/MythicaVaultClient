"use client";
// Import hooks/tools/context
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
export const UserTokenCtx = createContext();

export const UserTokenProvider = ({ children }) => {
  const [userPayload, setUserPayload] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  //! Authenticated fetch request with auto-refresh on 401
  async function authFetch(url, option = {}) {
    const token = localStorage.getItem("token");

    try {
      let res = await fetch(url, {
        ...option,
        headers: {
          ...(option.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // If the response is 401, refresh the token and retry the request
      if (!res.ok) {
        const newToken = await refreshToken();
        let res2 = await fetch(url, {
          ...option,
          headers: {
            ...(option.headers || {}),
            Authorization: `Bearer ${newToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res2.json();
        return data;
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Fetch error:", err);

      return null;
    }
  }

  // Refresh token (stored in cookie)
  async function refreshToken() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 401) {
      console.warn("Refresh token expierd");
      localStorage.removeItem("token");
      setUserPayload(null);
      router.refresh();
      router.push("/");
      return;
    }

    if (!res.ok) return console.warn("Refresh token failed");

    const { accessToken } = await res.json();

    localStorage.setItem("token", accessToken);
    setUserPayload(jwtDecode(accessToken));

    return accessToken;
  }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      const payload = jwtDecode(accessToken);
      setUserPayload(payload);
    }
    setIsLoading(false);
  }, []);

  return (
    <UserTokenCtx.Provider
      value={{ userPayload, authFetch, setUserPayload, error, setError }}
    >
      {children}
    </UserTokenCtx.Provider>
  );
};
