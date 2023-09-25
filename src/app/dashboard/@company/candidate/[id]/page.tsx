import Actions from "./_components/Actions";
import CandidateProfile from "../../_components/CandidateProfile";
import DashboardModal from "@/components/DashboardModal";
import getCandidate from "@/utils/getCandidate";

const CompanyDashboardCandidatePage = async (props: {
  params: { id: string };
}) => {
  const candidate = await getCandidate(props.params.id);

  if (candidate) {
    return (
      <DashboardModal>
        <CandidateProfile candidate={candidate} />
        <Actions />
      </DashboardModal>
    );
  }
};

export default CompanyDashboardCandidatePage;
