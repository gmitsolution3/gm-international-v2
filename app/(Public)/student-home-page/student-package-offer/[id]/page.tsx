import { OfferSidebar } from "../components/offerSidebar";

interface OfferDetailsPageProps {
  params: { id: string };
  searchParams: { from?: string };
}

export default async function OfferDetailsPage({
  params,
  searchParams,
}: OfferDetailsPageProps) {
  const { id } = await params;

  const sParams = await searchParams;
  const source = sParams.from;

  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/admin/scholarship-package-management/${id}`,
    {
      cache: "no-store",
    }
  );

  const packageDetails = await res.json();

 

  // const {_id,selectedCountry,selectedUniversity,imgURL,packagePrice,applicationRequirement,courseName,createdAt,deadlineDate,idCard,scholarshipDetails,selectDuration,selectLanguage,selectStudyLevel,selectUniversitiesProgram,sl_No,} = packageDetails;
  const {
    _id,
    selectedCountry,
    selectedUniversity,
    imgURL,
    packagePrice,
    applicationRequirement,
    courseName,
    createdAt,
    deadlineDate,
    idCard,
    scholarshipDetails,
    selectDuration,
    selectLanguage,
    selectStudyLevel,
    selectUniversitiesProgram,
    sl_No,
    startingDate,
    tuitionFree,
    universityUrl,
    universitysDescription,
  } = packageDetails;

  const packageSidebarInfo = {
    id,
    _id,
    packagePrice,
    courseName,
    createdAt,
    deadlineDate,
    idCard,
    selectDuration,
    selectLanguage,
    selectStudyLevel,
    selectUniversitiesProgram,
    sl_No,
    startingDate,
    tuitionFree,
  };

  

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:justify-start">
              <div
                className={`rounded-2xl bg-linear-to-br from-gray-300 to-gray-400 transition-all duration-300`}
              >
                <img
                  src={imgURL}
                  alt=""
                  className={`w-full rounded-2xl bg-linear-to-br from-gray-300 to-gray-400 transition-all duration-300 hover:scale-105 shadow-lg `}
                />
              </div>
              {/* University Info */}
              <div className="mt-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                  {selectedUniversity}
                </h3>
                <p className="text-sm text-gray-600 mb-4 transition-all duration-300">
                  {/* {selectedCountry.name} */}
                </p>
              </div>
            </div>

            {/* University Description */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">University Description:</h2>
              <p className="text-foreground/80 leading-relaxed">
                {universitysDescription}
              </p>
              <a
                href={universityUrl}
                className="text-destructive font-semibold hover:underline"
                target="_blank"
              >
                Visit Website
              </a>
            </section>

            {/* Scholarship Details */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Scholarship Details:</h2>
              <p className="text-foreground/80 leading-relaxed">
                {scholarshipDetails}
              </p>
            </section>

            {/* Apply Requirements */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Apply Requirements:</h2>
              {/* <ul className="space-y-2">
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
              </ul> */}
              <p>{applicationRequirement}</p>
            </section>

            {/* Application Process */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Application Process:</h2>
              <ul className="space-y-2">
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
                <li className="flex gap-3 text-foreground/80">
                  <span className="text-destructive">•</span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </li>
              </ul>
              {}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OfferSidebar
              packageSidebarInfo={packageSidebarInfo}
              source={source}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
