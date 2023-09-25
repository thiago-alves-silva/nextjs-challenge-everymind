import { JOBS_BY_COMPANY_GET } from "@/api";
import { JobApi } from "@/types/IJob";

const getJobListByCompany = async (companyId: string) => {
  const { url, options } = JOBS_BY_COMPANY_GET(companyId);
  const response = await fetch(url, options);

  if (response.ok) {
    const JobApi = (await response.json()) as JobApi[];
    return JobApi;
  }

  return null;
};

export default getJobListByCompany;
