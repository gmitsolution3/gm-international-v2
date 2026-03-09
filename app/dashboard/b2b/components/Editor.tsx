"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";

export default function Editor({ onChange }: any) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
      });

      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, []);

  return <div ref={editorRef} style={{ height: "200px" }} />;
}
