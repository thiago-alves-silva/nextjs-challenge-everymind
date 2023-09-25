import { CANDIDATE_GET } from "@/api";
import { CandidateApi } from "@/types/ICandidate";

const getCandidate = async (id: string) => {
  const { url, options } = CANDIDATE_GET(id);
  const response = await fetch(url, options);

  if (response.ok) {
    const candidateApi = (await response.json()) as CandidateApi;

    return candidateApi;
  }

  return null;
};

export default getCandidate;
