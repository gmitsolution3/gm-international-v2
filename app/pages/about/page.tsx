import { getTeamMember } from "@/app/dashboard/setting/about/page";
import TeamMemberCom from "../components/TeamMember";

const AboutPage = async () => {
  const teamMembers = await getTeamMember();
  return (
    <div>
      <TeamMemberCom members={teamMembers.data} />
    </div>
  );
};

export default AboutPage;
