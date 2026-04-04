import Link from "next/link";
import React from "react";

interface ServiceCardProps {
  iconUrl: string; // changed from ReactNode to string URL
  title: string;
  description: string;
  color: string;
  titleColor: string; // added titleColor here
  page_link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  iconUrl,
  title,
  description,
  titleColor,
  page_link,
}) => {
  return (
    <Link href={page_link}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center text-center group animate-fadeInUp">
        <div>
          <img src={iconUrl} alt={title} className="w-8 h-8" />
        </div>
        <h3
          className={`${titleColor} text-3xl font-bold mb-3 text-gray-800 group-hover:text-red-500 transition-colors duration-300`}
        >
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      iconUrl: "https://i.postimg.cc/y84YY3ng/famicons-school-sharp.png", // placeholder URL
      title: "Student",
      description: "Your Global Education Starts Here",
      color: "bg-gray-100",
      titleColor: "text-blue-700",
      page_link: "/student-home-page",
    },
    {
      iconUrl:
        "https://i.postimg.cc/TPQR97xj/streamline-ultimate-favorite-medical-bold.png",
      title: "Medical",
      description: "Advanced Medical Treatment Abroad",
      color: "bg-red-500",
      titleColor: "text-red-500",
      page_link: "/medical-home-page",
    },
    {
      iconUrl: "https://i.postimg.cc/bYZtZb0B/majesticons-airplane.png",
      title: "Tourism",
      description: "Travel the World with Confidence",
      color: "bg-sky-400",
      titleColor: "text-sky-300",
      page_link: "/tourist-home-page",
    },
    {
      iconUrl: "https://i.postimg.cc/5tPX0N6m/solar-pie-chart-3-bold.png",
      title: "Business",
      description: "Expand Your Business Globally",
      color: "bg-gray-800",
      titleColor: "text-black",
      page_link: "/business-home-page",
    },
    {
      iconUrl: "https://i.postimg.cc/L8253ZfF/9023992-student-fill-icon-1.png",
      title: "International Student",
      description:
        "GM International আপনাকে দিচ্ছে Full & Partial Scholarship, Admission, Visa Processing এবং Complete Guideline",
      color: "bg-red-500",
      titleColor: "text-red-500",
      page_link: "/international-student",
    },
    {
      iconUrl:
        "https://i.postimg.cc/sDRg3ZTr/3383446-airport-departure-luggage-passenger-tourist-icon-1.png",
      title: "International Tourist",
      description:
        "Bangladesh is an increasingly popular destination for foreign tourists who want authentic culture, natural beauty, and fewer crowds compared to many other countries in South Asia.",
      color: "bg-gray-700",
      titleColor: "text-blue-700",
      page_link: "/international-tourist",
    },
    {
      iconUrl: "https://i.postimg.cc/PxV3nHPT/825-removebg-preview.png",
      title: "Umrah And Hajj",
      description:
        "Experience a spiritually transformative journey through Umrah and Hajj, deepening your faith and connection with Allah.",
      color: "bg-gray-700",
      titleColor: "text-green-700",
      page_link: "/umrah&hajj",
    },
  ];

  return (
    <section className="min-h-[80vh] flex items-center w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-red-500">Explore</span> Your Journey
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            We Provide You The Best
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            No matter your goal — studying, traveling, receiving medical care,
            or growing your business abroad — we are here to provide expert
            assistance, simplify your visa process, and make your dream journey
            a reality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-pointer">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Bottom Row - Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:max-w-7xl lg:mx-auto hover:cursor-pointer">
          {services.slice(4).map((service, index) => (
            <ServiceCard key={index + 4} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
