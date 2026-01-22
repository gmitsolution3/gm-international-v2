import SupportSection from "@/app/components/HSupport/HSupport";
import { UniversitiesHeader } from "./components/universitiesHeader";
import { UniversitiesList } from "./components/universitiesList";

export default async function UniversitiesPage() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/mange-university/admin`,
    {
      cache: "no-store",
    },
  );

  const allUniversitiesList = await data.json();

  return (
    <main className="min-h-screen bg-background">
      {/* <UniversitiesHeader
        country={"Australia"}
        totalCount={allUniversitiesList.length}
      /> */}
      
      <UniversitiesList
        universities={allUniversitiesList}
        country={"Australia"}
      />
      <SupportSection />
    </main>
  );
}
