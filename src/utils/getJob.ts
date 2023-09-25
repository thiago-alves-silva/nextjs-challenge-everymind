import { JOB_GET } from "@/api";
import { JobApi } from "@/types/IJob";

const getJob = async (id: string) => {
  const { url, options } = JOB_GET(id);
  const response = await fetch(url, options);

  if (response.ok) {
    const job = (await response.json()) as JobApi;
    return job;
  }

  return null;
};

export default getJob;
