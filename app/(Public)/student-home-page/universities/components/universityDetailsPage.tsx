import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import { ScholarshipCardProps } from "../../components/OfferCard";
import UniversityHeroSection from "./universityHeroSection";

interface UniversityDetailsPageProps {
  university: {
    _id: string;
    country: string;
    university: string;
    studyLevel: string;
    universityUrl: string;
    introduction: string;
    photo: string;
  };
}

export default function UniversityDetailsPage({
  university,
}: {
  university: ScholarshipCardProps;
}) {
  return (
    <main className="min-h-screen bg-white">
      <UniversityHeroSection university={university} />
      <PackageDescriptionView html={university.universityDescription}/>
    </main>
  );
}
