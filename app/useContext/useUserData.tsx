"use client";


import React, { createContext, useContext, useState } from "react";

interface UserDetails {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
}

interface UserContextType {
  user: UserDetails;
  setUser: React.Dispatch<React.SetStateAction<UserDetails>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDetails>({
    name: null,
    email: null,
    photo: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return context;
};
