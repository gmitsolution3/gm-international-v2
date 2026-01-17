// "use client";

// import { useEffect, useRef } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";

// interface DescriptionEditorProps {
//   value: string;
//   onChange: (value: string) => void;
//   from?: string
// }

// export function DescriptionEditor({ value, onChange, from }: DescriptionEditorProps) {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);

//   useEffect(() => {
//     if (editorRef.current && !quillRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//         placeholder: "Enter package description...",
//         modules: {
//           toolbar: [
//             ["bold", "italic", "underline"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             [{ header: [1, 2, 3, false] }],
//             ["link"],
//             [{ table: true }],
//             ["clean"],
//           ],
//           clipboard: {
//             matchVisual: false,
//           },
//         },
//         formats: [
//           "bold",
//           "italic",
//           "underline",
//           "list",
//           "header",
//           "link",
//           "table",
//         ],
//       });

//       // Set initial value
//       if (value) {
//         quillRef.current.root.innerHTML = value;
//       }

//       // Handle content changes
//       quillRef.current.on("text-change", () => {
//         const html = quillRef.current?.root.innerHTML || "";
//         onChange(html === "<p><br></p>" ? "" : html);
//       });
//     }

//     return () => {
//       // Cleanup
//     };
//   }, []);

//   useEffect(() => {
//     if (
//       quillRef.current &&
//       value &&
//       quillRef.current.root.innerHTML !== value
//     ) {
//       quillRef.current.root.innerHTML = value;
//     }
//   }, [value]);

//   return (
//     <Card className="border border-border">
//       {from === "forUniversityDescription" ? (
//         <CardHeader className="border-b border-border">
//           <CardTitle className="text-xl text-[#CA2328]">
//             University Description
//           </CardTitle>
//           <CardDescription>
//             Add detailed information about the University with formatting
//           </CardDescription>
//         </CardHeader>
//       ) : (
//         <CardHeader className="border-b border-border">
//           <CardTitle className="text-xl text-[#CA2328]">
//             Package Description
//           </CardTitle>
//           <CardDescription>
//             Add detailed information about the package with formatting
//           </CardDescription>
//         </CardHeader>
//       )}

//       <CardContent className="pt-6">
//         <div
//           ref={editorRef}
//           className="quill-editor"
//           style={{
//             borderRadius: "0.625rem",
//           }}
//         />
//         <p className="text-xs text-muted-foreground mt-2">
//           Tip: Use formatting tools to make your description more appealing.
//           Image uploads and scripts are disabled for security.
//         </p>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props {
  form: any;
  name: string;
  from?: string;
}

export function DescriptionEditorRHF({ form, name, from }: Props) {
  const { setValue, watch } = form;

  const value = watch(name);

  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, false] }],
            ["link"],
            ["clean"],
          ],
        },
        formats: ["bold", "italic", "underline", "list", "header", "link"],
      });

      // initial value
      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML || "";
        setValue(name, html === "<p><br></p>" ? "" : html, {
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (
      quillRef.current &&
      value !== undefined &&
      quillRef.current.root.innerHTML !== value
    ) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <Card className="border border-border">
      {from === "forUniversityDescription" ? (
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl text-[#CA2328]">
            University Description
          </CardTitle>
          <CardDescription>
            Add detailed information about the University with formatting
          </CardDescription>
        </CardHeader>
      ) : (
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl text-[#CA2328]">
            Package Description
          </CardTitle>
          <CardDescription>
            Add detailed information about the package with formatting
          </CardDescription>
        </CardHeader>
      )}

      <CardContent className="pt-6">
        <div
          ref={editorRef}
          className="quill-editor"
          style={{ borderRadius: "0.625rem" }}
        />

        <p className="text-xs text-muted-foreground mt-2">
          Tip: Use formatting tools to make your description more appealing.
        </p>
      </CardContent>
    </Card>
  );
}

