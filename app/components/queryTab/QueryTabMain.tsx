import { useState } from "react";
import { ServiceCards } from "./ServiceCards";
import SearchingMain from "./SearchingMain";

export const getPlaceholderByService = (service: string): string => {
  switch (service) {
    case "Scholarship":
      return "Search university, program, subject, location";
    case "Medical":
      return "Search medical, location, disease, cost route";
    case "Tourist":
      return "Search location, country, cost route";
    case "Business":
      return "Search industry, investment type, location";
    case "Visa":
      return "Search visa type, country, processing time";
    case "Umrah Hajj":
      return "Search package type, date, accommodation";
    default:
      return "Type your message...";
  }
};

// Query Tab Component
export const QueryTab = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="h-full space-y-3">
      {!selectedService ? (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">
            Select a service:
          </p>
          <ServiceCards onSelect={setSelectedService} />
        </div>
      ) : (
        <div className="h-full">
          <SearchingMain
            selectedService={selectedService}
            onSelect={setSelectedService}
          />
        </div>
      )}
    </div>
  );
};
