import { JOBS_GET } from "@/api";
import { JobFilter } from "@/types/IJobFilter";
import { JobApi } from "@/types/IJob";
import normalizeJob from "./normalizeJob";

const getJobList = async (filters?: JobFilter) => {
  const { url, options } = JOBS_GET(filters);
  const response = await fetch(url, options);

  if (response.ok) {
    const jobs = (await response.json()) as JobApi[];
    return jobs.map((candidate) => normalizeJob(candidate));
  }

  return [];
};

export default getJobList;
