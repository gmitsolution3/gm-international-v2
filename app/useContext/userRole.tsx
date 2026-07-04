"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SessionUser } from "../components/hideAbleNavBar/hideableNavbar";

const userRoleContext = () => {
  const [userRole, setUserRole] = useState("user");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!session) return;

    if (status === "authenticated" && session?.user?.email) {
      setLoading(true);
      const fetchUserRole = async () => {
        try {
          setUserRole((session?.user as SessionUser)?.userRole);
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

export default userRoleContext;
