"use client"

import React, { useRef, useEffect } from "react";
import "quill/dist/quill.snow.css";

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const initQuill = async () => {
      const Quill = (await import("quill")).default;

      if (!editorRef.current || quillRef.current || !mounted) return;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        // placeholder: "Enter hospital description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link"],
            ["clean"],
          ],
        },
      });

      quillRef.current = quill;

      // Set initial value safely
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      const handleChange = () => {
        const html = quill.root.innerHTML;
        onChange(html === "<p><br></p>" ? "" : html);
      };

      quill.on("text-change", handleChange);

      // Cleanup
      return () => {
        quill.off("text-change", handleChange);
      };
    };

    initQuill();

    return () => {
      mounted = false;
    };
  }, []);

  // Sync external value safely
  useEffect(() => {
    if (!quillRef.current) return;

    const currentHTML = quillRef.current.root.innerHTML;

    if (value !== currentHTML) {
      const selection = quillRef.current.getSelection();
      quillRef.current.clipboard.dangerouslyPasteHTML(value || "");

      if (selection) {
        quillRef.current.setSelection(selection);
      }
    }
  }, [value]);

  return (
    <div className="border border-red-200 rounded-lg overflow-hidden">
      <div className="bg-linear-to-r from-red-50 to-orange-50 border-b border-red-200 p-4">
        <h3 className="font-semibold text-red-700">Hospital Description</h3>
        <p className="text-sm text-gray-600">
          Add detailed information about the hospital with formatting
        </p>
      </div>

      <div
        ref={editorRef}
        className="min-h-50 bg-white"
      />

      <div className="bg-red-50 border-t border-red-200 p-2">
        <p className="text-xs text-gray-500">
          Tip: Use formatting tools to make your description more appealing.
        </p>
      </div>
    </div>
  );
};

export default DescriptionEditor;
