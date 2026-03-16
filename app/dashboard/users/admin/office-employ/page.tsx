import React from "react";
import UserTable from "../components/UserTable";

const AllEmploy = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/users/get-employ`,
    {
      cache: "no-cache",
    },
  );
  return res.json();
};

const OfficeEmploy = async () => {
  const employ = await AllEmploy();

  if (!employ.success) {
    return <div>No user found in db</div>;
  }

  return (
    <div>
      <UserTable initialUsers={employ.data} />
    </div>
  );
};

export default OfficeEmploy;
