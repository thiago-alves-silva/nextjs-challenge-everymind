import { Metadata } from "next";
import RegistrationForm from "./_components/RegistrationForm";
import getCandidate from "@/utils/getCandidate";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import formatToLocaleDate from "@/utils/formatToLocaleDate";

export const metadata: Metadata = {
  title: "Dados cadastrais - Perfil",
};

const CandidateDashboardRegistrationDataPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const candidate = user ? await getCandidate(user.id) : null;

  if (candidate) {
    const birthdate = formatToLocaleDate(candidate.birthdate);
    candidate.birthdate = birthdate;
  }

  return <RegistrationForm candidate={candidate} />;
};

export default CandidateDashboardRegistrationDataPage;
