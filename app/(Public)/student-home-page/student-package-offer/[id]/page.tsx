import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import { OfferSidebar } from "../components/offerSidebar";
import { AiOutlineGlobal } from "react-icons/ai";

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
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/${id}`,
    {
      cache: "no-store",
    }
  );

  const packageDetails = await res.json();

 const {
   _id,
   city,
   country,
   deadline,
   language,
   duration,
   startingDate,
   thumbnail,
   applicationFee,
   description,
   universityDescription,
   serviceFee,
   universityName,
   universityURL,
 } = packageDetails;



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
                  src={thumbnail}
                  alt={universityName}
                  className={`w-full rounded-2xl bg-linear-to-br from-gray-300 to-gray-400 transition-all duration-300 hover:scale-105 shadow-lg `}
                />
              </div>
              {/* University Info */}
              <div className="mt-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                  {universityName}
                </h3>
                <p className="text-sm text-red-700 mb-4 transition-all duration-300">
                  {country}-{city}
                </p>
              </div>
              <a
                href={universityURL}
                className="text-destructive font-semibold hover:underline flex items-center gap-2"
                target="_blank"
              >
                <AiOutlineGlobal /> University
              </a>
            </div>

            {/* University Description */}
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Package Description:</h2>

              <div>
                <PackageDescriptionView html={description} />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OfferSidebar packageSidebarInfo={packageDetails} source={source} />
          </div>
        </div>
      </div>
    </div>
  );
}
