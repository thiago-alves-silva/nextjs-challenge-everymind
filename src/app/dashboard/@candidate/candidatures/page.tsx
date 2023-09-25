import { Metadata } from "next";
import {
  Candidature,
  CandidatureWithJobAndCompany,
} from "@/types/ICandidature";
import { CANDIDATURES_GET } from "@/api";
import CandidatureItem from "./_components/CandidatureItem";
import DashboardModal from "@/components/DashboardModal";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import getJob from "@/utils/getJob";
import getCompany from "@/utils/getCompany";
import normalizeJob from "@/utils/normalizeJob";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Minhas candidaturas",
};

const getCandidatures = async (id: string): Promise<Candidature[]> => {
  const { url, options } = CANDIDATURES_GET(id);
  const response = await fetch(url, options);

  if (response.ok) {
    const candidatures = (await response.json()) as Candidature[];

    return candidatures;
  }

  return [];
};

const CandidateDashboardCandidaturesPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const candidatures = user ? await getCandidatures(user.id) : [];
  const candidaturesWithJobAndCompany = await Promise.all(
    candidatures.map(async (candidature) => {
      const job = await getJob(candidature.job_id);
      const company = job ? await getCompany(job.id_company) : null;
      const candidatureWithJobAndCompany: CandidatureWithJobAndCompany = {
        ...candidature,
        job: job ? normalizeJob(job) : null,
        company,
      };

      return candidatureWithJobAndCompany;
    })
  );

  return (
    <DashboardModal>
      <h1 className={styles.title}>Minhas Candidaturas</h1>
      {!candidatures.length && (
        <h2 className={styles["not-found"]}>Nenhuma vaga encontrada!</h2>
      )}
      {!!candidaturesWithJobAndCompany.length && (
        <ul className={styles["candidature-list"]}>
          {candidaturesWithJobAndCompany.map((candidature) => (
            <CandidatureItem
              key={candidature.job_id}
              candidature={candidature}
            />
          ))}
        </ul>
      )}
    </DashboardModal>
  );
};

export default CandidateDashboardCandidaturesPage;
