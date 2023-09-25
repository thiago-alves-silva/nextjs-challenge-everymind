import { Job } from "@/types/IJob";
import ClockIcon from "../../../../../../../public/clock.svg";
import elapsedTime from "@/utils/elapsedTime";
import formatToLocaleDate from "@/utils/formatToLocaleDate";
import styles from "./JobCard.module.css";

interface JobCardProps {
  job: Job;
  elapsedTime?: boolean;
}

const JobCard = ({ job, ...props }: JobCardProps) => {
  const location = `${job.state}, ${job.city} (${job.work_model})`;

  return (
    <div className={styles.card}>
      <span className={styles.title}>{job.title}</span>
      <ul className={styles["feature-list"]}>
        <li className={styles["feature-item"]}>
          <ClockIcon className={styles.icon} />
          <span>{formatToLocaleDate(job.deadline_date)}</span>
        </li>
      </ul>
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
