"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUserRole = () => {
  const [userRole, setUserRole] = useState("user");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    if (status === "authenticated" && session?.user?.email) {
      setLoading(true);
      const fetchUserRole = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/user-role?email=${session?.user?.email}`
          );
          if (!res.ok) throw new Error("Failed to fetch user role");
          const data = await res.json();
          setUserRole(data.userRole);
        } catch (err) {
          console.error(err);
          setUserRole("user");
        } finally {
          setLoading(false);
        }
      };

      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [status, session]);

  return { userRole, loading };
};

export default useUserRole;
