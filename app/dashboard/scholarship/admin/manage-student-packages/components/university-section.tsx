"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use, useState } from "react";
import Image from "next/image";

interface UniversitySectionProps {
  data: {
    universityName: string;
    country: string;
    city: string;
    worldRanking: string;
    thumbnail?: File | null;
  };
  onChange: (field: string, value: any) => void;
}

export function UniversitySection({ data, onChange }: UniversitySectionProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     onChange("thumbnail", file);
  //   }
  // };

  const handleThumbnailChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Cloudinary Upload
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

      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }

      setPreview(result.secure_url);

      onChange("thumbnail", result.secure_url);
      // setImgFormData((prev) => ({
      //   ...prev,
      //   secure_url: result.secure_url,
      // }));
      setUploading(false);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  console.log({ preview: preview });

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
            <Label
              htmlFor="universityName"
              className="text-foreground font-semibold"
            >
              University Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="universityName"
              placeholder="Enter university name"
              value={data.universityName}
              onChange={(e) => onChange("universityName", e.target.value)}
              className="border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-foreground font-semibold">
              Country <span className="text-primary">*</span>
            </Label>
            <Input
              id="country"
              placeholder="Enter country"
              value={data.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-foreground font-semibold">
              City <span className="text-primary">*</span>
            </Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="worldRanking"
              className="text-foreground font-semibold"
            >
              World Ranking <span className="text-primary">*</span>
            </Label>
            <Input
              id="worldRanking"
              type="number"
              placeholder="e.g., 50"
              value={data.worldRanking}
              onChange={(e) => onChange("worldRanking", e.target.value)}
              className="border-border focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail" className="text-foreground font-semibold">
            University Thumbnail
          </Label>
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
                {data.thumbnail ? (
                  <div className="space-y-2">
                    <Image
                      src={`${preview}`}
                      alt="University Thumbnail"
                      width={30}
                      height={30}
                    />
                    <p className="text-primary font-semibold">
                      ✓ {data.thumbnail.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Click to change
                    </p>
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
