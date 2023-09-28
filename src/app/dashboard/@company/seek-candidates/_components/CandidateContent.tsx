"use client";
import { useCompanyCandidates } from "@/context/CompanyCandidatesContext";
import { Candidate } from "@/types/ICandidate";
import { useEffect, useState } from "react";
import CandidateList from "../../_components/CandidateList";
import CompanyCandidatesFilterModal from "./CompanyCandidatesFilterModal";
import FilterButton from "@/components/FilterButton";
import styles from "./CandidateContent.module.css";

interface CandidateContentProps {
  candidates: Candidate[];
}

const CandidateContent = (props: CandidateContentProps) => {
  const {
    candidates,
    setCandidates,
    filter,
    showFilterModal,
    setShowFilterModal,
  } = useCompanyCandidates();
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    setCandidates(props.candidates);
  }, [props.candidates, setCandidates]);

  useEffect(() => {
    setFilterCount(() => {
      const filterValues = Object.values(filter);
      const count = filterValues.filter((value) => {
        if (Array.isArray(value)) {
          return value.length;
        }

        return value !== null;
      }).length;
      return count;
    });
  }, [filter]);

  return (
    <>
      <div className={styles.header}>
        <FilterButton
          count={filterCount}
          onClick={() => setShowFilterModal(true)}
        />
      </div>
      {!candidates.length && (
        <h2 className={styles["not-found"]}>Nenhum candidato encontrado!</h2>
      )}
      {!!candidates.length && <CandidateList candidates={candidates} />}
      {showFilterModal && (
        <CompanyCandidatesFilterModal
          onClose={() => setShowFilterModal(false)}
        />
      )}
    </>
  );
};

export default CandidateContent;
