import ApplicationInAdminDashboard from "./components/applicationTable";
import AddApplication from "./components/addApplication";

const ManageStudentApplication = async () => {
  const manageApplicationData = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/manage-application`,
    {
      cache: "no-store",
    }
  );
  const applicationData = await manageApplicationData.json();

  return (
    <main className="min-h-screen bg-background">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Application Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all student applications
            </p>
          </div>
          <AddApplication />
        </div>

        <ApplicationInAdminDashboard applicationData={applicationData} />
      </div>
    </main>
  );
};

export default ManageStudentApplication;
