import Link from "next/link";
import React from "react";

const UmrahPackages = () => {
  return (
    <div>
      <h1>Umrah Packages</h1>
      <p>This is the Umrah Packages page.</p>
      <Link href="/dashboard/hajj-umrah/admin/umrah-packages/create-package">
        <button className="text-2xl bg-red-700 px-4 py-2 text-white rounded-2xl hover:cursor-pointer">
          Create Package
        </button>
      </Link>
    </div>
  );
};

export default UmrahPackages;
