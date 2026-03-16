import React from "react";
import UserTable from "../components/UserTable";

const allUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-users`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

const AllUsers = async () => {
  const user = await allUser();

  if (!user.success) {
    return <div>No user found in db</div>;
  }

  return (
    <div>
      <UserTable initialUsers={user.data} />
    </div>
  );
};

export default AllUsers;
