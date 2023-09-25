import Link from "next/link";
import JobCard from "./JobCard";
import styles from "./JobInvitations.module.css";
import { Job } from "@/types/IJob";

interface JobInvitationsProps {
  jobs: Job[];
  className?: string;
}

const JobInvitations = (props: JobInvitationsProps) => {
  return (
    <div className={`${props.className || ""}`}>
      <h3 className={styles.title}>Convites de vagas por recrutadores</h3>
      <ul className={styles["job-list"]}>
        {props.jobs.map((job, index) => (
          <li key={`${job.id}-${index}`} className={styles["job-item"]}>
            <Link href={`jobs/${job.id}`}>
              <JobCard job={job} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobInvitations;
