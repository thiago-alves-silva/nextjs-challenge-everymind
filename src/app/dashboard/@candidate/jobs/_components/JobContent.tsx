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
  const [jobsBySearch, setJobsBySearch] = useState<Job[]>([]);
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
    setJobsBySearch(() => {
      return jobs.filter((job) => {
        const searchText = replaceAccents(search.toLowerCase());
        return replaceAccents(job.title.toLowerCase()).includes(searchText);
      });
    });
  }, [jobs, search]);

  useEffect(() => {
    setFilterCount(() => {
      const filterValues = Object.values(filter);
      const count = filterValues.filter((value) => value).length;
      return count;
    });
  }, [filter]);

  useEffect(() => {
    setJobs(props.jobRecommendation);
  }, [props.jobRecommendation, setJobs]);

  return (
    <>
      <div className={styles.header}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterButton
          count={filterCount}
          disabled={!jobs.length}
          onClick={() => setShowFilterModal(true)}
        />
      </div>
      {props.jobInvitations.length ? (
        <JobInvitations
          jobs={props.jobInvitations}
          className={styles["job-invitations"]}
        />
      ) : null}
      {jobsBySearch.length ? (
        <JobRecommendation jobs={jobsBySearch} />
      ) : (
        <h2 className={styles["not-found"]}>Nenhuma vaga encontrada!</h2>
      )}
      {showFilterModal && (
        <CandidateJobFilterModal onClose={() => setShowFilterModal(false)} />
      )}
    </>
  );
};

export default JobContent;
