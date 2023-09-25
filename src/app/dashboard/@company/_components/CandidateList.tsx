import { Candidate } from "@/types/ICandidate";
import CandidateCard from "./CandidateCard";
import Link from "next/link";
import styles from "./CandidateList.module.css";

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList = (props: CandidateListProps) => {
  return (
    <ul className={styles.list}>
      {props.candidates.map((candidate) => (
        <li key={candidate.id}>
          <Link href={`/dashboard/candidate/${candidate.id}`}>
            <CandidateCard candidate={candidate} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CandidateList;
