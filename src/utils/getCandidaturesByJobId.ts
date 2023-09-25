import { CANDIDATURES_BY_JOB_ID_GET } from "@/api";
import { Candidature } from "@/types/ICandidature";

const getCandidaturesByJobId = async (jobId: string) => {
  const { url, options } = CANDIDATURES_BY_JOB_ID_GET(jobId);
  const response = await fetch(url, options);

  if (response.ok) {
    const candidates = (await response.json()) as Candidature[];
    return candidates;
  }

  return [];
};

export default getCandidaturesByJobId;
