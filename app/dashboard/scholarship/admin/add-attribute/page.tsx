import Link from 'next/link';
import React from 'react'

const AddAttributes = () => {
  return (
    <div>
      <Link href="/dashboard/scholarship/admin/add-attribute/notice">
        <button className="bg-red-700 px-4 py-2 rounded-xl hover:bg-red-800 text-white font-bold">
          Add Notice
        </button>
      </Link>
    </div>
  );
}

export default AddAttributes