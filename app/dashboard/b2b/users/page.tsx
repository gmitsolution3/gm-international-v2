import React from "react";
import { getAllB2BUsers } from "../components/fetch";
import UsersTable from "../components/usersTable";
import { Users } from "lucide-react";

const B2BUsers = async () => {
  const {data} = await getAllB2BUsers();


  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-red-900">
            User Data Table
          </h1>
        </div>
        <p className="text-red-700">Total Users: {data.length}</p>
      </div>
      <div>
        <UsersTable allUsers={data} />
      </div>
    </div>
  );
};

export default B2BUsers;
