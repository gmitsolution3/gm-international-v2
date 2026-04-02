"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  noticeFor: z.enum(["student", "medical", "business", "tourist"]).refine(
    (val) => val !== undefined,
    { message: "Please select a category" }
  ),
});

type FormValues = z.infer<typeof schema>;

const NOTICE_FOR_OPTIONS = [
  { value: "student", label: "Student" },
  { value: "medical", label: "Medical" },
  { value: "business", label: "Business" },
  { value: "tourist", label: "Tourist" },
];

export default function AddNoticeForm() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      noticeFor: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write notice description...",
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

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML ?? "";
        setValue("description", html === "<p><br></p>" ? "" : html, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/notice/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            createdAt: new Date().toISOString(),
          }),
        },
      );

      const result = await res.json();

      console.log({result: result})

      if (!res.ok) throw new Error("Failed to add notice");

      toast.success("Notice added successfully");

      reset();
      if (quillRef.current) {
        quillRef.current.root.innerHTML = "";
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card className="border border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl text-[#CA2328]">Add Notice</CardTitle>
          <CardDescription>
            Fill in the details to publish a new notice
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Notice Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Notice title</Label>
              <Input
                id="title"
                placeholder="e.g. Admission deadline extended"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Notice For */}
            <div className="space-y-1.5">
              <Label>Notice for</Label>
              <Controller
                control={control}
                name="noticeFor"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {NOTICE_FOR_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.noticeFor && (
                <p className="text-xs text-destructive">
                  {errors.noticeFor.message}
                </p>
              )}
            </div>

            {/* Notice Description - Quill */}
            <div className="space-y-1.5">
              <Label>Notice description</Label>
              <div ref={editorRef} style={{ borderRadius: "0.625rem" }} />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#CA2328] hover:bg-[#a81c20] text-white min-w-28"
              >
                {isSubmitting ? "Adding..." : "Add notice"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
