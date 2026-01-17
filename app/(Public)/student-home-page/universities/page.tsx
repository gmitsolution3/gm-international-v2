import SupportSection from "@/app/components/HSupport/HSupport";
import { UniversitiesHeader } from "./components/universitiesHeader";
import { UniversitiesList } from "./components/universitiesList";



export default async function UniversitiesPage() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/mange-university/admin`,
    {
      cache: "no-store",
    }
  );

  const allUniversitiesList = await data.json();

  const country = "Australia";
  const totalCount = allUniversitiesList.length;

  return (
    <main className="min-h-screen bg-background">
      <UniversitiesHeader country={country} totalCount={totalCount} />
      <UniversitiesList universities={allUniversitiesList} country={country} />
      <SupportSection />
    </main>
  );
}
