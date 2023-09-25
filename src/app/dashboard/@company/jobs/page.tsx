import { Metadata } from "next";
import { JobApi } from "@/types/IJob";
import { JOBS_BY_COMPANY_GET } from "@/api";
import DashboardModal from "@/components/DashboardModal";
import JobContent from "./_components/JobContent";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import normalizeJob from "@/utils/normalizeJob";

export const metadata: Metadata = {
  title: "Vagas",
};

const getJobList = async (companyId: string) => {
  const { url, options } = JOBS_BY_COMPANY_GET(companyId);
  const response = await fetch(url, options);

  if (response.ok) {
    const jobs = (await response.json()) as JobApi[];
    return jobs.map((job) => normalizeJob(job));
  }

  return [];
};

const CompanyDashboardJobsPage = async () => {
  const user = getUserFromTokenOnServerSide();
  const jobList = user ? await getJobList(user.id) : [];

  return (
    <DashboardModal>
      <JobContent jobs={jobList.filter((j) => j.active)} />
    </DashboardModal>
  );
};

export default CompanyDashboardJobsPage;
