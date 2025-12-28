import UniversityDetailsPage from "../components/universityDetailsPage";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function DetailsPage({ params }: Params) {
  const { id } = await params;
 

  const data = await fetch(
    `https://gm-international-server-gamma.vercel.app/manage-university/details/${id}`,
    {
      cache: "no-store",
    }
  );
  const universityDetails = await data.json();

  return <UniversityDetailsPage university={universityDetails} />;
}
