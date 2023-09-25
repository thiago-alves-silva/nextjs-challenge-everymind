import elapsedTime from "@/utils/elapsedTime";
import styles from "./JobCard.module.css";
import { Job } from "@/types/IJob";

interface JobCardProps {
  job: Job;
  elapsedTime?: boolean;
}

const JobCard = ({ job, ...props }: JobCardProps) => {
  const location = `${job.city}, ${job.state} (${job.work_model})`;

  return (
    <div className={styles.card}>
      <span className={styles.image}></span>
      <span className={styles.title}>{job.title}</span>
      <span className={styles.company}>{"Empresa"}</span>
      <span className={styles.location}>{location}</span>
      {props.elapsedTime && (
        <span className={styles["elapsed-time"]}>
          {elapsedTime(job.createdAt)}
        </span>
      )}
    </div>
  );
};

export default JobCard;