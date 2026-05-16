// app/page.tsx or wherever you want to use the form
"use client";

import { toast } from "sonner";
import TeamMemberForm from "../components/TeamMemberForm";

export default function TeamPage() {
  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/create-team-member`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();


      if (result.success) {
        toast.success("Team member saved successfully!");
        return;
      }

      toast.success("Team member is not saved!");
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error("Failed to save team member");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <TeamMemberForm onSubmit={handleSubmit} />
    </div>
  );
}
