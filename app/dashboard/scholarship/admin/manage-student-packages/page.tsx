import AddScholarshipPackage from "./components/addScholarshipPackage";
import ScholarshipPackageInAdminDashboard from "./components/scholarShipPackageTable";
import ScholarshipPackageTable from "./components/scholarShipPackageTable";

const ManageStudentPackage = async () => {
  const manageScholarShipPackage = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management`,
    {
      next: { revalidate: 300 },
    }
  );
  const scholarShipData = await manageScholarShipPackage.json();

  console.log( "data",scholarShipData.data)

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Application Scholarship Packages
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all student Package
            </p>
          </div>
          <AddScholarshipPackage
            universityData={scholarShipData.universityData}
          />
        </div>

        {/* <ScholarshipPackageTable scholarShipData={scholarShipData}/> */}
        <ScholarshipPackageInAdminDashboard
          scholarshipPackage={scholarShipData.data}
        />
      </div>
    </main>
  );
};

export default ManageStudentPackage;
