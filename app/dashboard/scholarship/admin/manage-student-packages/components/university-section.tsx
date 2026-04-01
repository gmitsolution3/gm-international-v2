"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";

export function UniversitySection({ form }: any) {
  const { register, setValue, watch } = form;

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const thumbnail = watch("thumbnail");

  const handleThumbnailChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) throw new Error("Upload failed");

      setPreview(result.secure_url);

      // ✅ react-hook-form এ value সেট
      setValue("thumbnail", result.secure_url, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setUploading(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setUploading(false);
    }
  };

  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-xl text-[#CA2328]">
          University Information
        </CardTitle>
        <CardDescription>
          Add details about the university offering this package
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>University Name *</Label>
            <Input
              placeholder="Enter university name"
              {...register("universityName", {
                required: true,
              })}
            />
          </div>

          <div className="space-y-2">
            <Label>Country *</Label>
            <Input
              placeholder="Enter country"
              {...register("country", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label>City *</Label>
            <Input
              placeholder="Enter city"
              {...register("city", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label>University Url *</Label>
            <Input
              type="text"
              placeholder="e.g., 50"
              {...register("universityURL", { required: true })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>University Thumbnail *</Label>

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-[#CA2328] hover:bg-secondary transition-colors cursor-pointer">
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />

            <label htmlFor="thumbnail" className="cursor-pointer block">
              <div className="text-sm">
                {thumbnail ? (
                  <div className="space-y-2">
                    <Image
                      src={preview || thumbnail}
                      alt="University Thumbnail"
                      width={120}
                      height={120}
                      className="mx-auto rounded"
                    />
                    <p className="text-primary font-semibold">
                      ✓ Image uploaded
                    </p>
                    {uploading && (
                      <p className="text-xs text-muted-foreground">
                        Uploading...
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

