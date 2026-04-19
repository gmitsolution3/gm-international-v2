// components/GlobalOffices.tsx
import React from "react";
import Image from "next/image";

interface Office {
  id: string;
  country: string;
  address: string[];
  email: string;
  phone: string[];
  imageUrl: string;
}

const offices: Office[] = [
  {
    id: "dhaka",
    country: "Dhaka, Bangladesh",
    address: [
      "House 1, Road 1, Section 7, Mirpur 11, Dhaka-1216",
      "Dhaka, Bangladesh, 1216",
    ],
    email: "gminternational.live@gmail.com",
    phone: ["+880 189 6042360", "+880 198 796501"],
    imageUrl: "https://i.postimg.cc/K8QMpqnt/dhaka-01.png",
  },
  {
    id: "bogura",
    country: "Bogura, Bangladesh",
    address: ["Rakhi Manson (3rd Floor),Jalesharitola, bogura"],
    email: "gminternational.live@gmail.com",
    phone: ["+880 189 6042360", "+880 1898 796505"],
    imageUrl: "https://i.postimg.cc/K8QMpqnt/dhaka-01.png",
  },
  // {
  //   id: "beijing",
  //   country: "Beijing, China",
  //   address: [
  //     "8th Floor, 2 Bir Uttam AK Khandakar Road,",
  //     "Mohakhali C/A, Dhaka 1212, Bangladesh",
  //   ],
  //   email: "gminternational.live@gmail.com",
  //   phone: "+8809610-902323",
  //   imageUrl: "https://i.postimg.cc/4xQ70LTX/Bogura.png",
  // },

  {
    id: "guangzhou",
    country: "Guangzhou, China",
    address: ["Sanyuanli, Guangzhou Shi, Guangzhou, China, 510000"],
    email: "gminternational.live@gmail.com",
    phone: ["+86 198 7564 7323"],
    imageUrl: "https://i.postimg.cc/4xQ70LTX/Bogura.png",
  },
  {
    id: "malaysia",
    country: "Malaysia",
    address: ["JALAN PJS 8/9 Mentari, Petaling Jaya."],
    email: "gminternational.live@gmail.com",
    phone: ["+60 16 357 3847"],
    imageUrl: "https://i.postimg.cc/J4ZgXJjg/1222222.png",
  },
  {
    id: "thailand",
    country: "Thailand",
    address: [
      "171, Ambassador Hotel, Sukhumvit Soi-11, Wattana, Bangkok-10110, Thailand",
    ],
    email: "gminternational.live@gmail.com",
    phone: ["+66 97 030 9762", "+66 095 494 0180"],
    imageUrl: "https://i.postimg.cc/pLJhSGMg/Thailand.png",
  },
  {
    id: "australia",
    country: "Australia",
    address: ["8 Walz St Rockdale, NSW 2216, Australia"],
    email: "gminternational.live@gmail.com",
    phone: ["+61 4 2624 3477"],
    imageUrl: "https://i.postimg.cc/QC4tnSk9/Australia.png",
  },
 
];

const GlobalOffices: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Global Offices
        </h2>
        <div className="w-20 h-1 bg-red-800 mx-auto"></div>
      </div>

      {/* Offices List */}
      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 md:gap-6 items-stretch">
        {offices.map((office) => (
          <div
            key={office.id}
            className={`h-full flex flex-col sm:flex-row md:items-start gap-4 sm:gap-6 overflow-hidden transition-shadow duration-300 p-2 rounded-2xl`}
          >
            {/* Image Container - Left Side */}
            <div className="relative w-full sm:w-28 h-28 shrink-0 self-end">
              <div className="absolute inset-0 z-10"></div>
              <Image
                src={office.imageUrl}
                alt={office.country}
                fill
                className="object-cover md:object-contain"
                sizes="(max-width: 640px) 100vw, 192px"
                color="white"
              />
            </div>

            {/* Content Container - Right Side */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-start md:justify-center">
              {/* Country */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                {office.country}
              </h3>

              {/* Address */}
              <div className="text-sm text-gray-200 mb-3 space-y-1">
                {office.address.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5">
                {/* Email */}
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-200 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-white hover:text-red-400 hover:underline"
                  >
                    {office.email}
                  </a>
                </div>

                {/* Phone */}
                {office.phone && (
                  <div className="flex gap-4 flex-col md:flex-row">
                    {office.phone.map((p, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <svg
                          className="w-4 text-gray-100 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a
                          href={`tel:${p.replace(/\s/g, "")}`}
                          className="text-gray-200 hover:text-red-900"
                        >
                          {p}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GlobalOffices;
