import React from "react";
import { getSingleB2BUser } from "../../components/fetch";
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
  const { user } = await searchParams;

  const b2bUser = await getSingleB2BUser(user);
  const aUser = b2bUser.data.result;

 


  return (
    <>
      {/* <div className="my-4">
        <h1 className="text-2xl font-bold">
          B2B user assign package to{" "}
          <span className="text-red-600">{aUser.userName}</span>
        </h1>
        <p className="text-sm text-gray-500">See the b2b user full details</p>
      </div> */}
      {/* <div className="block lg:hidden space-y-4">
        <div
          key={aUser._id}
          className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-5 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slide-up"
          style={{ animationDelay: `${2 * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-red-100">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">
                {aUser.userName}
              </h3>
            </div>
            {aUser.isActive ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-red-500 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-red-600 font-semibold">Email</p>
                <p className="text-sm text-gray-800 break-all">{aUser.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-red-500 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-red-600 font-semibold">Phone</p>
                <p className="text-sm text-gray-800">{aUser.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-red-500 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-red-600 font-semibold">Role</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                  {aUser.userRole}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-1 text-xs shrink-0">ID:</span>
              <div>
                <p className="text-xs text-red-600 font-semibold">
                  B2B Profile
                </p>
                <p className="text-sm text-gray-800 break-all">
                  {aUser.b2bProfileId}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-1 text-xs shrink-0">By:</span>
              <div>
                <p className="text-xs text-red-600 font-semibold">Created By</p>
                <p className="text-sm text-gray-800 break-all">
                  {aUser.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-red-500 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-red-600 font-semibold">Created At</p>
                <p className="text-sm text-gray-800">
                  {formatDate(aUser.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div>
        <UserTable aUser={aUser} />
      </div> */}

      <div>
        <div className="mt-10">
          <h1 className="text-2xl font-bold">Assignable Package</h1>
          <p className="text-gray-500 text-md">
            Assign to b2b user
          </p>
        </div>
        <div>
          <UniversityApplications
            universities={b2bUser.data.packageList}
            aUser={aUser}
          />
        </div>
      </div>
    </>
  );
};

export default AssignStudentPackage;
