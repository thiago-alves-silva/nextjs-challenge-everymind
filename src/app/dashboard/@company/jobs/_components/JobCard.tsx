import ClockIcon from "../../../../../../public/clock.svg";
import elapsedTime from "@/utils/elapsedTime";
import styles from "./JobCard.module.css";
import { Job } from "@/types/IJob";
import formatToLocaleDate from "@/utils/formatToLocaleDate";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{job.title}</span>
      <ul className={styles["attribute-list"]}>
        <li className={styles.item}>
          <ClockIcon className={styles.icon} />
          <span className={styles.value} title="Data de expiração">
            {formatToLocaleDate(job.deadline_date)}
          </span>
        </li>
      </ul>
      <span className={styles["elapsed-time"]}>
        {elapsedTime(job.createdAt)}
      </span>
    </div>
  );
};

export default JobCard;
