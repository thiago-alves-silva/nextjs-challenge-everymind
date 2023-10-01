import { Job } from "@/types/IJob";
import ClockIcon from "../../../../../../public/clock.svg";
import UserIcon from "../../../../../../public/user.svg";
import elapsedTime from "@/utils/elapsedTime";
import formatToLocaleDate from "@/utils/formatToLocaleDate";
import getCandidaturesByJobId from "@/utils/getCandidaturesByJobId";
import normalizeExperienceLevel from "@/utils/normalizeExperienceLevel";
import normalizeWorkModel from "@/utils/normalizeWorkModel";
import styles from "./JobCard.module.css";

interface JobCardProps {
  job: Job;
}

const JobCard = async ({ job }: JobCardProps) => {
  const candidatures = await getCandidaturesByJobId(job.id);
  const location = `${job.city}, ${job.state} (${normalizeWorkModel(
    job.work_model
  )})`;

  return (
    <div className={styles.card}>
      <span className={styles.title}>
        {job.title} - {normalizeExperienceLevel(job.experience_level)}
      </span>
      <span className={styles.location}>{location}</span>
      <ul className={styles["attribute-list"]}>
        <li className={styles.item} title="Candidaturas">
          <UserIcon className={styles.icon} />
          <span className={styles.value}>{candidatures.length}</span>
        </li>
        <li className={styles.item} title="Data de expiração">
          <ClockIcon className={styles.icon} />
          <span className={styles.value}>
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
