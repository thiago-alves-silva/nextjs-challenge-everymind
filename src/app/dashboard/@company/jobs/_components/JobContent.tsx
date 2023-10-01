import { Job } from "@/types/IJob";
import JobCard from "./JobCard";
import Link from "next/link";
import styles from "./JobContent.module.css";
import CreateJobButton from "./CreateJobButton";

interface JobContentProps {
  jobs: Job[];
}

const JobContent = (props: JobContentProps) => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Vagas da Empresa</h2>
        <CreateJobButton />
      </div>
      {!props.jobs.length && (
        <h2 className={styles["not-found"]}>Nenhuma vaga encontrada!</h2>
      )}
      {!!props.jobs.length && (
        <ul className={styles["job-list"]}>
          {props.jobs.map((job, index) => (
            <li key={`${job.id}-${index}`} className={styles["job-item"]}>
              <Link href={`jobs/${job.id}`}>
                <JobCard job={job} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default JobContent;
