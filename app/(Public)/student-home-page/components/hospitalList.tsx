import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface University {
  _id: string;
  country: string;
  university: string;
  studyLevel: string;
  universityUrl: string;
  introduction: string;
  photo: string;
}

export default async function UniversitySection() {
  const data = await fetch(
    "https://gm-international-server-gamma.vercel.app/mange-university/admin",
    {
      cache: "no-cache",
    }
  );

  const universities = await data.json();
  const displayedUniversities = universities.slice(0, 3);

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Popular <span className="text-red-600">University</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedUniversities.map((university: University) => (
            <UniversityCard key={university._id} university={university} />
          ))}
        </div>

        {/* View More Button */}
        {universities.length > 3 && (
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-full font-semibold"
            >
              <Link href="/universities">View More</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="text-center">
        <Link href="/student-home-page/universities">
          <Button>View more</Button>
        </Link>
      </div>
    </section>
  );
}

function UniversityCard({ university }: { university: University }) {
  return (
    <div className="border border-red-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-200 overflow-hidden">
        <Image
          src={university.photo || "/placeholder.svg"}
          alt={university.university}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex flex-col grow">
        {/* University Name */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          {university.university}
        </h3>

        {/* Country */}
        <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-3">
          {university.country}
        </p>

        {/* Introduction/Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5 grow line-clamp-3">
          {university.introduction}
        </p>

        {/* View Details Button */}
        <Link href={`/student-home-page/universities/${university._id}`}>
          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 w-full font-semibold bg-transparent"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
