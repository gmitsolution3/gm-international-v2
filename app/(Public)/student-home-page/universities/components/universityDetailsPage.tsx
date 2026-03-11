import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import { ScholarshipCardProps } from "../../components/OfferCard";
import UniversityHeroSection from "./universityHeroSection";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

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
  source,
}: {
  university: ScholarshipCardProps;
  source?: { from?: string; form: string; b2bId: string };
}) {

  console.log({source: source})

  return (
    <main className="min-h-screen bg-white">
      <UniversityHeroSection university={university} source={source} />

      {/* Description Section */}
      <section className="px-6 md:px-10 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600">
              About The University
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Explore detailed information about the university, academic
              environment, facilities, and opportunities offered for students.
            </p>

            {/* underline accent */}
            <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Description Content */}
          <div className="bg-white border border-red-100 rounded-2xl shadow-sm p-6 md:p-10">
            <PackageDescriptionView html={university.universityDescription} />
          </div>
          <div className="my-6 p-8 border border-gray-200 rounded-2xl">
            <YoutubeVideoPlayer url={university?.universityVideoLink} />
          </div>
        </div>
      </section>
    </main>
  );
}
