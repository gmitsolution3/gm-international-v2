"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type EditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Editor({ value = "", onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
        ],
      },
    });

    if (value) {
      quillRef.current.root.innerHTML = value;
    }

    quillRef.current.on("text-change", () => {
      const html = quillRef.current?.root.innerHTML || "";
      onChange?.(html);
    });

    return () => {
      quillRef.current = null;
    };
  }, []);

  return <div ref={editorRef} className="min-h-50" />;
}
