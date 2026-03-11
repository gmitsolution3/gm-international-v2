
// export default ServiceComponent;
import { notFound } from "next/navigation";

import Link from "next/link";
import { getAllServices, getServiceConfig } from "../utils/formConfig";
import DealController from "../components/DealController";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

interface ServicePageProps {
  params: {
    service: string;
  };
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    service: service.id,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {

  const { service } = await params

  const session = await getServerSession(authConfig);

  const userEmail = session?.user?.email; 

  const serviceConfig = getServiceConfig(service);

  // If service not found, show 404
  if (!serviceConfig) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-18 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/business-home-page"
              className="text-xl font-bold text-red-700"
            >
              Service Portal
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {serviceConfig.title}
              </span>
              <Link
                href="/business-home-page"
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {/* <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <DynamicForm serviceConfig={serviceConfig} />
      </div> */}
      <div className="min-h-screen bg-gray-100 py-8">
        <DealController
          serviceConfig={serviceConfig}
          service={service}
          userEmail={userEmail}
        />
      </div>
    </div>
  );
}
