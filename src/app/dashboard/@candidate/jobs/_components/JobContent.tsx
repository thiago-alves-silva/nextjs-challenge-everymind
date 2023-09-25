"use client";
import { Job } from "@/types/IJob";
import { useCandidateJobs } from "@/context/CandidateJobsContext";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import FilterButton from "@/components/FilterButton";
import JobInvitations from "./JobInvitations";
import JobRecommendation from "./JobRecommendation";
import CandidateJobFilterModal from "./CandidateJobFilterModal";
import replaceAccents from "@/utils/replaceAccents";
import styles from "./JobContent.module.css";

interface JobContentProps {
  jobInvitations: Job[];
  jobRecommendation: Job[];
}

const JobContent = (props: JobContentProps) => {
  const {
    search,
    setSearch,
    showFilterModal,
    setShowFilterModal,
    jobs,
    setJobs,
    filter,
  } = useCandidateJobs();
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    setJobs(() => {
      return props.jobRecommendation.filter((job) => {
        const searchText = replaceAccents(search.toLowerCase());
        return job.title.toLowerCase().includes(searchText);
      });
    });
  }, [props.jobRecommendation, search, setJobs]);

  useEffect(() => {
    setFilterCount(() => {
      const filterValues = Object.values(filter);
      const count = filterValues.filter((value) => value).length;
      return count;
    });
  }, [filter]);

  return (
    <>
      <div className={styles.header}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterButton
          count={filterCount}
          onClick={() => setShowFilterModal(true)}
        />
      </div>
      {props.jobInvitations.length ? (
        <JobInvitations
          jobs={props.jobInvitations}
          className={styles["job-invitations"]}
        />
      ) : null}
      {props.jobRecommendation.length ? (
        <JobRecommendation jobs={jobs} />
      ) : null}
      {showFilterModal && (
        <CandidateJobFilterModal onClose={() => setShowFilterModal(false)} />
      )}
    </>
  );
};

export default JobContent;
