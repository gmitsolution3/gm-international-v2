"use client";

import { useEffect, useState } from "react";

const useLoaderData = (route: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!route) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://gm-international-server-gamma.vercel.app/${route}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route]);

  return { data, loading, error };
};

export default useLoaderData;
