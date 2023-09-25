import { Metadata } from "next";
import DashboardModal from "@/components/DashboardModal";
import FeedbackForm from "./_components/FeedbackForm";
import getCandidature from "@/utils/getCandidature";
import getJob from "@/utils/getJob";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const candidature = await getCandidature(params.id);
  const job = candidature ? await getJob(candidature.job_id) : null;

  return {
    title: job ? `Feedback - ${job.title}` : `Feedback`,
  };
}

const CandidateDashboardCandidatureFeedbackPage = async (props: {
  params: { id: string };
}) => {
  // validar se o usuário já desbloqueou a etapa de feedback da vaga
  const candidature = await getCandidature(props.params.id);
  const job = candidature ? await getJob(candidature.job_id) : null;

  if (candidature && job) {
    return (
      <DashboardModal>
        <h1 className={styles.title}>Feedback - {job.title}</h1>
        <p className={styles.description}>
          Conte para nós o que achou do nosso processo seletivo. Destaque os
          pontos positivos e o que podemos fazer para melhorar a seleção.
        </p>
        <FeedbackForm candidatureId={candidature._id} />
      </DashboardModal>
    );
  }
};

export default CandidateDashboardCandidatureFeedbackPage;
