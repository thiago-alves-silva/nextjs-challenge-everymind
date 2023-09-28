import { Job } from "@/types/IJob";
import { WorkModel } from "@/types/WorkModel";
import Image from "next/image";
import elapsedTime from "@/utils/elapsedTime";
import normalizeWorkModel from "@/utils/normalizeWorkModel";
import styles from "./JobCard.module.css";
import getCompany from "@/utils/getCompany";
import { useEffect, useState } from "react";
import { Company } from "@/types/ICompany";

interface JobCardProps {
  job: Job;
  elapsedTime?: boolean;
}

const JobCard = ({ job, ...props }: JobCardProps) => {
  const [company, setCompany] = useState<Company | null>(null);
  const location = `${job.city}, ${job.state} (${normalizeWorkModel(
    job.work_model as WorkModel
  )})`;

  useEffect(() => {
    (async () => {
      const company = await getCompany(job.id_company);

      if (company) {
        setCompany(company);
      }
    })();
  }, [job.id_company]);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={`/api/company/image/${company?.profile_image}`}
          alt="Foto de perfil"
          width={40}
          height={40}
        />
      </div>
      <span className={styles.title}>{job.title}</span>
      <span className={styles.company}>{company?.name}</span>
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
