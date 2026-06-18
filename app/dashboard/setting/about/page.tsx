// app/dashboard/setting/about/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import React from "react";
import ManageTeamMember from "./components/ManageTeamMember";

export const getTeamMember = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/about-team/api/v1/get/all-team-member`,
      {
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!result.success) {
      throw new Error("Something was wrong!!");
    }

    return result;
  } catch (err: any) {
    console.log(err);
    return { success: false, data: [] };
  }
};

const CreateAboutMain = async () => {
  const result = await getTeamMember();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href={"/dashboard/setting/about/create"}>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Team Member +
          </button>
        </Link>
      </div>

      <div>
        <ManageTeamMember teamMember={result.data || []} />
      </div>
    </div>
  );
};

export default CreateAboutMain;
