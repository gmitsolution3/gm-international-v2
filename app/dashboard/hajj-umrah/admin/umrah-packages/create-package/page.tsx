// app/admin/packages/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { PackageForm } from "../../components/UmrahPackageForm";
import { toast } from "sonner";

export default function CreatePackagePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/create-hajj-package`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Package created successfully!");
        router.push("/dashboard/hajj-umrah/admin/umrah-packages");
        return;
      }
      toast.error(result.message || "Failed to create package.");
    } catch (error) {
      console.error("Failed to create package:", error);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <PackageForm onSubmit={handleSubmit} />
    </div>
  );
}
