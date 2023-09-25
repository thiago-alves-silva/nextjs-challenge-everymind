import { Metadata } from "next";
import RegistrationForm from "./_components/RegistrationForm";
import getCandidate from "@/utils/getCandidate";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";

export const metadata: Metadata = {
  title: "Dados cadastrais - Perfil",
};

const CandidateDashboardRegistrationDataPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const candidate = user ? await getCandidate(user.id) : null;

  if (candidate) {
    const birthdate = new Date(candidate.birthdate).toLocaleDateString();
    candidate.birthdate = birthdate;
  }

  return <RegistrationForm candidate={candidate} />;
};

export default CandidateDashboardRegistrationDataPage;
