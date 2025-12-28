import UniversityIntroduction from "./universitiesIntroduction"
import UniversityHeroSection from "./universityHeroSection"

interface UniversityDetailsPageProps {
  university: {
    _id: string
    country: string
    university: string
    studyLevel: string
    universityUrl: string
    introduction: string
    photo: string
  }
}

export default function UniversityDetailsPage({ university }: UniversityDetailsPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <UniversityHeroSection university={university} />
      <UniversityIntroduction introduction={university.introduction} />
    </main>
  )
}
