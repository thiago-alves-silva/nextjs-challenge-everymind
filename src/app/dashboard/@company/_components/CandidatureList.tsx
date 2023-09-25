import { CandidateApi } from "@/types/ICandidate";
import { Candidature } from "@/types/ICandidature";
import CandidateCard from "./CandidateCard";
import Link from "next/link";
import getCandidate from "@/utils/getCandidate";
import normalizeCandidate from "@/utils/normalizeCandidate";
import styles from "./CandidatureList.module.css";

interface CandidatureListProps {
  candidatures: Candidature[];
}

const CandidatureList = async (props: CandidatureListProps) => {
  const candidates = (
    await Promise.allSettled(
      props.candidatures.map((c) => getCandidate(c.candidate_id))
    )
  )
    .filter(
      (p): p is PromiseFulfilledResult<CandidateApi> =>
        p.status === "fulfilled" && p.value !== null
    )
    .map((p) => normalizeCandidate(p.value));

  return (
    <ul className={styles.list}>
      {candidates.map((candidate, index) => (
        <li key={candidate.id}>
          <Link
            href={`/dashboard/candidature/${props.candidatures[index]._id}`}
          >
            <CandidateCard candidate={candidate} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CandidatureList;
