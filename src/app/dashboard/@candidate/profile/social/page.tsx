import getCandidate from "@/utils/getCandidate";
import SocialForm from "./_components/SocialForm";
import { Metadata } from "next";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";

export const metadata: Metadata = {
  title: "Dados sociais - Perfil",
};

const CandidateDashboardSocialDataPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const candidate = user ? await getCandidate(user.id) : null;

  return <SocialForm candidate={candidate} />;
};

export default CandidateDashboardSocialDataPage;
