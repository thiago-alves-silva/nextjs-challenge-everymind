import Actions from "./_components/Actions";
import AnswerList from "./_components/AnswerList";
import CandidateProfile from "../../_components/CandidateProfile";
import DashboardModal from "@/components/DashboardModal";
import getCandidate from "@/utils/getCandidate";
import getCandidature from "@/utils/getCandidature";
import getJob from "@/utils/getJob";

const CompanyDashboardCandidaturePage = async (props: {
  params: { id: string };
}) => {
  const candidature = await getCandidature(props.params.id);

  if (candidature) {
    const [candidate, job] = await Promise.all([
      getCandidate(candidature.candidate_id),
      getJob(candidature.job_id),
    ]);

    if (candidate && job) {
      return (
        <DashboardModal>
          <CandidateProfile candidate={candidate} />
          <AnswerList candidature={candidature} steps={job.steps} />
          <Actions candidature={candidature} />
        </DashboardModal>
      );
    }
  }
};

export default CompanyDashboardCandidaturePage;
