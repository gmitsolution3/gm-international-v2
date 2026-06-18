import AddScholarshipPackage from "./components/addScholarshipPackage";
import { ScholarshipPackageWrapper } from "./components/scholarshipPackageWrapper";


const ManageStudentPackage = async () => {
  const manageScholarShipPackage = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package/api/v1/get/available-pkg`,
    {
      next: { revalidate: 300 },
    },
  );
  const scholarShipData = await manageScholarShipPackage.json();
  return (
    <main className="min-h-screen bg-background">
      <div className="w-full">
        <div className="flex flex-col max-w-7xl mx-auto m-6 sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Application Scholarship Packages
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all student Package
            </p>
          </div>
          <AddScholarshipPackage />
        </div>
        <ScholarshipPackageWrapper scholarshipPackage={scholarShipData.data} />
      </div>
    </main>
  );
};

export default ManageStudentPackage;
