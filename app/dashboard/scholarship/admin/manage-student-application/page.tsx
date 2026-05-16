import AddApplication from "./components/addApplication";
import UserApplication from "./components/userApplication";

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
        <div className="flex flex-col max-w-7xl mx-auto m-6 sm:flex-row sm:items-center sm:justify-between gap-4">
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
        <UserApplication applicationData={applicationData} />
      </div>
    </main>
  );
};

export default ManageStudentApplication;
