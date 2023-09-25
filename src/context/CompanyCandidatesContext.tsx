"use client";
import { Candidate } from "@/types/ICandidate";
import { CandidateFilter } from "@/types/ICandidateFilter";
import { createContext, useContext, useState } from "react";

interface CompanyCandidatesContext {
  filter: CandidateFilter;
  setFilter: React.Dispatch<React.SetStateAction<CandidateFilter>>;
  showFilterModal: boolean;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const CompanyCandidatesContext = createContext<CompanyCandidatesContext>(
  {} as CompanyCandidatesContext
);

export const CompanyCandidatesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState<CandidateFilter>({
    racial_identity: null,
    family_income: null,
    indigenous_descendancy: null,
    has_disability: null,
    is_lgbtqia: null,
  });

  return (
    <CompanyCandidatesContext.Provider
      value={{
        filter,
        setFilter,
        candidates,
        setCandidates,
        showFilterModal,
        setShowFilterModal,
      }}
    >
      {children}
    </CompanyCandidatesContext.Provider>
  );
};

export const useCompanyCandidates = () => useContext(CompanyCandidatesContext);
