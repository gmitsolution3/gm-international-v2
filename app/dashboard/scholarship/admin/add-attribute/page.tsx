import Link from 'next/link';
import React from 'react'
import ManagedNotice from './components/ManagedNotice';

const AddAttributes =async () => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/get-notice`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  console.log(result)

  return (
    <div>
      <Link href="/dashboard/scholarship/admin/add-attribute/notice">
        <button className="bg-red-700 px-4 py-2 rounded-xl hover:bg-red-800 text-white font-bold">
          Add Notice
        </button>
      </Link>

      <div>
        <h1>Manage Notices</h1>
        <ManagedNotice data={result.data}/>
      </div>
    </div>
  );
}

export default AddAttributes