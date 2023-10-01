import { CandidateJobsProvider } from "@/context/CandidateJobsContext";
import { JobApi } from "@/types/IJob";
import { JOBS_GET } from "@/api";
import { Metadata } from "next";
import DashboardModal from "@/components/DashboardModal";
import JobContent from "./_components/JobContent";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import normalizeJob from "@/utils/normalizeJob";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Vagas",
};

const getJobList = async () => {
  const { url, options } = JOBS_GET();
  const response = await fetch(url, options);

  if (response.ok) {
    const jobs = (await response.json()) as JobApi[];
    return jobs.map((job) => normalizeJob(job));
  }

  return [];
};

const CandidateDashboardJobsPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const jobList = await getJobList();
  const jobInvitations = [];
  const jobRecommendation = jobList;

  console.log(user);

  return (
    <>
      <div className={styles.introduction}>
        <h1 className={styles.greeting}>Olá, {user?.name}</h1>
        <p className={styles.description}>
          Abaixo estão listadas as vagas consideradas pertinentes ao seu perfil
          ou aos seus filtros de busca
        </p>
      </div>
      <DashboardModal>
        <CandidateJobsProvider>
          <JobContent
            jobInvitations={[]}
            jobRecommendation={jobRecommendation.filter((job) => job.active)}
          />
        </CandidateJobsProvider>
      </DashboardModal>
    </>
  );
};

export default CandidateDashboardJobsPage;
