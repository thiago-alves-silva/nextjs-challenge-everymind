import { CANDIDATES_GET } from "@/api";
import { CandidateApi } from "@/types/ICandidate";
import { CandidateFilter } from "@/types/ICandidateFilter";
import normalizeCandidate from "./normalizeCandidate";

const getCandidateList = async (filters?: CandidateFilter) => {
  const { url, options } = CANDIDATES_GET(filters);
  const response = await fetch(url, options);

  if (response.ok) {
    const candidates = (await response.json()) as CandidateApi[];

    return candidates.map((candidate) => normalizeCandidate(candidate));
  }

  return [];
};

export default getCandidateList;
