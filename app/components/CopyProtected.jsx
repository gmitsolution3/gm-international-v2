// CopyProtected.jsx
"use client";
import { useEffect } from "react";

export default function CopyProtected({ children }) {
  useEffect(() => {
    const disableCopy = (e) => e.preventDefault();
    const disableContext = (e) => e.preventDefault();

    document.addEventListener("copy", disableCopy);
    document.addEventListener("contextmenu", disableContext);

    return () => {
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("contextmenu", disableContext);
    };
  }, []);

  return <div className="select-none">{children}</div>;
}
