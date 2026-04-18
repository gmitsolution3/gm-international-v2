import React from "react";
import UmrahHajjHero from "./components/UmrahHajjHero";
import ViewUmrahCard from "./components/ViewUmrahCard";
import Link from "next/link";

const UmrahHajjUserMainPage = () => {
  return (
    <main>
      <div>
        <UmrahHajjHero />
      </div>
      <div>
        <ViewUmrahCard />
        <div className="flex w-full justify-center">
          <Link
            href="/umrah&hajj/umrah-packages"
            className="inline-flex items-center gap-2 bg-white border-2 border-emerald-200 hover:border-emerald-400 text-emerald-700 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>View All Packages</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UmrahHajjUserMainPage;
