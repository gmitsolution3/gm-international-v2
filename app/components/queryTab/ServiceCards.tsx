// Service Cards Component

const ServiceDep = [
  "Scholarship",
  "Medical",
  "Tourist",
  "Business",
  "Umrah Hajj",
];

export const ServiceCards = ({
  onSelect,
}: {
  onSelect: (service: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {ServiceDep.map((service) => (
        <button
          key={service}
          onClick={() => onSelect(service)}
          className="p-2.5 text-xs font-medium bg-white border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-gray-700 shadow-sm hover:shadow-md"
        >
          {service}
        </button>
      ))}
    </div>
  );
};
