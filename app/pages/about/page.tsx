export const dynamic = "force-dynamic";

import { getTeamMember } from "@/app/dashboard/setting/about/page";
import TeamMemberCom from "../components/TeamMember";
import generateSEO from "@/lib/seo";


export const metadata = generateSEO(
  "About Us",
  "GM International helps clients with international visa applications, study abroad opportunities, medical tourism, and global travel services with trusted professional support.",
);

const AboutPage = async () => {
  const teamMembers = await getTeamMember();
  return (
    <div>
      <TeamMemberCom members={teamMembers.data} />
    </div>
  );
};

export default AboutPage;
