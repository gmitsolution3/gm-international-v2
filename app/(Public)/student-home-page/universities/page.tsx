import SupportSection from "@/app/components/HSupport/HSupport";
import { UniversitiesHeader } from "./components/universitiesHeader";
import { UniversitiesList } from "./components/universitiesList";

// Mock data - in production, this would come from your API/database
const mockUniversities = [
  {
    _id: "69105d4db7e86ba065d65895",
    country: "Australia",
    university: "MIT",
    studyLevel: "Partial",
    universityUrl: "https://web.mit.edu/",
    introduction:
      "The Massachusetts Institute of Technology (MIT) is a private research university in Cambridge, Massachusetts, United States. Established in 1861, MIT has played a significant role in the development of many areas of modern technology and science.",
    photo:
      "https://res.cloudinary.com/dqyfwfeed/image/upload/v1762680113/hu7spxmdwet1nub47vql.jpg",
  },
  {
    _id: "69105d4db7e86ba065d65896",
    country: "Australia",
    university: "University of Sydney",
    studyLevel: "Full",
    universityUrl: "https://www.sydney.edu.au/",
    introduction:
      "The University of Sydney is one of Australia's most prestigious institutions. Founded in 1850, it is the oldest university in Australia and is consistently ranked among the top universities in the world.",
    photo:
      "https://images.unsplash.com/photo-1568721971604-2926d6c09ca1?w=600&h=400&fit=crop",
  },
  {
    _id: "69105d4db7e86ba065d65897",
    country: "Australia",
    university: "University of Melbourne",
    studyLevel: "Full",
    universityUrl: "https://www.unimelb.edu.au/",
    introduction:
      "The University of Melbourne is consistently ranked as one of the top universities globally. Established in 1853, it is the second oldest university in Australia with a strong reputation for research and excellence.",
    photo:
      "https://images.unsplash.com/photo-1569163871169-8ad83c2e5c4e?w=600&h=400&fit=crop",
  },
  {
    _id: "69105d4db7e86ba065d65898",
    country: "Australia",
    university: "Australian National University",
    studyLevel: "Partial",
    universityUrl: "https://www.anu.edu.au/",
    introduction:
      "ANU is consistently ranked among the world's top 30 universities and is known for its excellent research facilities and faculty. Located in Canberra, it offers comprehensive academic programs across various disciplines.",
    photo:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=400&fit=crop",
  },
  {
    _id: "69105d4db7e86ba065d65899",
    country: "Australia",
    university: "University of New South Wales",
    studyLevel: "Full",
    universityUrl: "https://www.unsw.edu.au/",
    introduction:
      "UNSW Sydney is a global leader in research and education. With a strong focus on innovation and industry engagement, UNSW offers world-class programs across engineering, business, sciences, and humanities.",
    photo:
      "https://images.unsplash.com/photo-1523321318423-f06268fccad5?w=600&h=400&fit=crop",
  },
];

export default async function UniversitiesPage() {
  const data = await fetch(
    "https://gm-international-server-gamma.vercel.app/mange-university/admin",
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
