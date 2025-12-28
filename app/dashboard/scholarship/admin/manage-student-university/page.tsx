import useLoaderData from "@/app/api/Data_Fetch/useLoaderData";
import AddUniversity from "./components/addUniversity";
import UniversityTable from "./components/universitiesTable";
import ScholarshipUniversityList from "./components/universitiesTable";

const ManageStudentUniveristy = async () => {
  const data = await fetch(
    "https://gm-international-server-gamma.vercel.app/mange-university/admin",
    {
      cache: "no-store",
    }
  );

  const allUniversitiesData = await data.json();

  

  return (
    <div className="min-h-screen  text-center flex flex-col">
      <div className="flex flex-col md:flex-row justify-between ">
        <div className="text-start">
          <h1 className="text-3xl font-bold text-black">
            University management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all university
          </p>
        </div>
        <AddUniversity />
      </div>
      <div>
        <ScholarshipUniversityList data={allUniversitiesData} />
      </div>
    </div>
  );
};

export default ManageStudentUniveristy;
