import { Suspense } from "react";
import { DashboardAnalyticsResponse } from "./Components/types/validations/analytics";
import InternDashboardAnalyticsMain from "./Components/DashboardAnalytics";
import DashboardSkeleton from "./Components/DashboardSkeleton";


async function getAnalytics(): Promise<DashboardAnalyticsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_EXPRESS_BASE_URL}/api/v1/intern/profile/analytics`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("analytics fetch failed:", err);
    return null;
  }
}

async function AnalyticsContent() {
  const data = await getAnalytics();
  return <InternDashboardAnalyticsMain data={data} />;
}

const InternDashboardMain = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<DashboardSkeleton />}>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
};

export default InternDashboardMain;
