import { Metadata } from "next";
import RegistrationForm from "./_components/RegistrationForm";
import getCompany from "@/utils/getCompany";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";

export const metadata: Metadata = {
  title: "Dados cadastrais - Perfil",
};

const CandidateDashboardRegistrationDataPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const company = user ? await getCompany(user.id) : null;

  return <RegistrationForm company={company} />;
};

export default CandidateDashboardRegistrationDataPage;
