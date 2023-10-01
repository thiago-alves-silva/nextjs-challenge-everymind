import { CompanyCandidatesProvider } from "@/context/CompanyCandidatesContext";
import { Metadata } from "next";
import DashboardModal from "@/components/DashboardModal";
import CandidateContent from "./_components/CandidateContent";
import getCandidateList from "@/utils/getCandidateList";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Buscar candidatos",
};

const CompanyDashboardSeekCandidatePage = async () => {
  const candidateList = await getCandidateList();
  const user = getUserFromTokenOnServerSide();

  return (
    <>
      <div className={styles.introduction}>
        <h1 className={styles.greeting}>Olá, {user?.name}</h1>
        <p className={styles.description}>
          Abaixo estão listadas alguns perfis sugeridos para preencher as vagas
          da empresa
        </p>
      </div>
      <DashboardModal>
        <CompanyCandidatesProvider>
          <CandidateContent candidates={candidateList} />
        </CompanyCandidatesProvider>
      </DashboardModal>
    </>
  );
};

export default CompanyDashboardSeekCandidatePage;
