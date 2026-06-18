import SupportSection from "@/app/components/HSupport/HSupport";
import { UniversitiesHeader } from "./components/universitiesHeader";
import { UniversitiesList } from "./components/universitiesList";

import generateSEO from "@/lib/seo";
import ScholarshipUtil from "@/app/util/scholarship/slider/Slider";
import ScholarshipFetch from "@/app/util/scholarship/fetches/fetches";

export const metadata = generateSEO(
  "International Student Scholarships for China, Malaysia & Australia",
  "Apply for fully funded and partial scholarships in China, Malaysia, and Australia. Get expert support for admissions, visa applications, and study abroad programs.",
);

export default async function UniversitiesPage() {
  const result = await ScholarshipFetch.getAllScholarshipPkg();
  return (
    <main className="min-h-screen bg-background">
      <UniversitiesList universities={result.data}/>
      <SupportSection />
    </main>
  );
}
