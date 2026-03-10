import React from "react";
import {
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import UniversityApplications from "../components/packageList";
import { UserTable } from "../components/userTable";
import { getB2BStudentPackage } from "../../components/fetch";


export const formatDate = (dateString: string) => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en", {
     year: "numeric",
     month: "short",
     day: "numeric",
     hour: "2-digit",
     minute: "2-digit",
   });
 };

const AssignStudentPackage = async ({ searchParams }: any) => {
  
  const b2bUser = await getB2BStudentPackage();

  return (
    <>
      <div>
        <div className="mt-10">
          <h1 className="text-2xl font-bold">Assignable Package</h1>
          <p className="text-gray-500 text-md">
            Assign to b2b user
          </p>
        </div>
        <div>
          <UniversityApplications
            universities={b2bUser.data}
          />
        </div>
      </div>
    </>
  );
};

export default AssignStudentPackage;
