"use client";

import { UmrahPackage } from "@/app/(Public)/umrah&hajj/components/UmrahPackageDetailsCom";
import { Calendar, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const QueryUmrahPkg = ({ umrahPkg }: { umrahPkg: UmrahPackage[] }) => {
  return (
    <div className="flex flex-col gap-2 px-2 py-2 w-full">
      {umrahPkg.map((u) => (
        <div
          key={u._id}
          className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Thumbnail */}
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={u.thumbnail}
              alt={u.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h2 className="truncate text-sm font-semibold text-gray-900">
              {u.title}
            </h2>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {u.departure_date} - {u.return_date}
              </span>
            </div>

            <span className="text-xs font-medium text-emerald-600">
              Price: {u.discount_price > 0 ? u.discount_price : u.price}
            </span>
          </div>

          {/* View Details */}
          <Link
            href={`/umrah&hajj/package/${u._id}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white transition-colors"
            title="View Details"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QueryUmrahPkg;
