import { useState } from "react";
import { ServiceCards } from "./ServiceCards";

const getPlaceholderByService = (service: string): string => {
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
    <div className="space-y-3">
      {!selectedService ? (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">
            Select a service:
          </p>
          <ServiceCards onSelect={setSelectedService} />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full">
              {selectedService}
            </span>
            <button
              onClick={() => setSelectedService(null)}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors"
            >
              ← Back
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Search {selectedService.toLowerCase()} information:
            </label>
            <input
              type="text"
              placeholder={getPlaceholderByService(selectedService)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-black"
              autoFocus
            />
            <button className="w-full bg-linear-to-r from-gray-900 via-red-950 to-red-900 hover:from-gray-800 hover:via-red-900 hover:to-red-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-2">
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};