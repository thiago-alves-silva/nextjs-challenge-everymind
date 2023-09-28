import Link from "next/link";
import JobCard from "./JobCard";
import styles from "./JobRecommendation.module.css";
import { Job } from "@/types/IJob";

interface JobRecommendationProps {
  jobs: Job[];
  className?: string;
}

const JobRecommendation = (props: JobRecommendationProps) => {
  return props.jobs.length ? (
    <div className={`${props.className || ""}`}>
      <p className={styles.title}>Vagas relevantes ao seu perfil</p>
      <ul className={styles["job-list"]}>
        {props.jobs.map((job, index) => (
          <li key={`${job.id}-${index}`}>
            <Link href={`jobs/${job.id}`}>
              <JobCard job={job} elapsedTime={true} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h2 className={styles["not-found"]}>Nenhuma vaga encontrada!</h2>
  );
};

export default JobRecommendation;
