import SupportSection from "@/app/components/HSupport/HSupport";
import { UniversitiesHeader } from "./components/universitiesHeader";
import { UniversitiesList } from "./components/universitiesList";

import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "International Student Scholarships for China, Malaysia & Australia",
  "Apply for fully funded and partial scholarships in China, Malaysia, and Australia. Get expert support for admissions, visa applications, and study abroad programs.",
);


export default async function UniversitiesPage() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/mange-university/admin`,
    {
      cache: "no-store",
    },
  );

  const allUniversitiesList = await data.json();

  return (
    <main className="min-h-screen bg-background">
      {/* <UniversitiesHeader
        country={"Australia"}
        totalCount={allUniversitiesList.length}
      /> */}
      
      <UniversitiesList
        universities={allUniversitiesList}
        country={"Australia"}
      />
      <SupportSection />
    </main>
  );
}
