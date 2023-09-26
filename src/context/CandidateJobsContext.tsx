"use client";
import { Job } from "@/types/IJob";
import { JobFilter } from "@/types/IJobFilter";
import { createContext, useContext, useState } from "react";

interface CandidateJobsContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filter: JobFilter;
  setFilter: React.Dispatch<React.SetStateAction<JobFilter>>;
  showFilterModal: boolean;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const CandidateJobsContext = createContext<CandidateJobsContext>(
  {} as CandidateJobsContext
);

export const CandidateJobsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState<JobFilter>({
    announcement_time: "",
    experience_level: null,
    work_model: null,
    location: null,
  });

  return (
    <CandidateJobsContext.Provider
      value={{
        search,
        setSearch,
        filter,
        setFilter,
        jobs,
        setJobs,
        showFilterModal,
        setShowFilterModal,
      }}
    >
      {children}
    </CandidateJobsContext.Provider>
  );
};

export const useCandidateJobs = () => useContext(CandidateJobsContext);
