import React from "react";
import B2BPartner from "../components/B2BPartnar";

const b2bPartner = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/b2b-partner`,
    {
      cache: "no-cache",
    },
  );
  return res.json();
};

const B2BUsersAdmin = async () => {
  const b2b = await b2bPartner();

  if (!b2b.success) {
    return <div>No user found in db</div>;
  }

  return (
    <div>
      <B2BPartner initialUsers={b2b.data} />
    </div>
  );
};

export default B2BUsersAdmin;
