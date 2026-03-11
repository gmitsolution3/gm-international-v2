import UniversityDetailsPage from "../components/universityDetailsPage";

interface Params {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; form: string; b2bId: string }>;
}

export default async function DetailsPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { form, b2bId } = await searchParams;
  const source = { form, b2bId };

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/manage-university/details/${id}`,
    {
      cache: "no-store",
    },
  );
  const universityDetails = await data.json();

  return (
    <UniversityDetailsPage university={universityDetails} source={source} />
  );
}
