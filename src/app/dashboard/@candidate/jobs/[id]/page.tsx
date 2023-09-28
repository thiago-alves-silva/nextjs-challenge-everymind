import { ExperienceLevel } from "@/types/ExperienceLevel";
import { Metadata } from "next";
import { WorkModel } from "@/types/WorkModel";
import DashboardModal from "@/components/DashboardModal";
import LocationIcon from "../../../../../../public/location.svg";
import WorkIcon from "../../../../../../public/work.svg";
import MoneyIcon from "../../../../../../public/money.svg";
import ClockIcon from "../../../../../../public/clock.svg";
import StarIcon from "../../../../../../public/star.svg";
import ApplyButton from "./_components/ApplyButton";
import Link from "next/link";
import formatToCurrency from "@/utils/formatToCurrency";
import formatToLocaleDate from "@/utils/formatToLocaleDate";
import getCandidaturesByJobId from "@/utils/getCandidaturesByJobId";
import getJob from "@/utils/getJob";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import normalizeWorkModel from "@/utils/normalizeWorkModel";
import normalizeExperienceLevel from "@/utils/normalizeExperienceLevel";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = await getJob(params.id);

  return {
    title: job?.title || `Vaga ${params.id}`,
  };
}

const CandidateJobPage = async ({ params }: { params: { id: string } }) => {
  const [job, candidatures] = await Promise.all([
    getJob(params.id),
    getCandidaturesByJobId(params.id),
  ]);
  const user = getUserFromTokenOnServerSide();
  const alreadyApplied = !!candidatures.find(
    (c) => c.candidate_id === user?.id
  );

  if (job) {
    return (
      <DashboardModal className={styles.modal}>
        <h1 className={styles.title}>{job.title}</h1>
        <Link href={`/dashboard/company/${"123"}`} className={styles.company}>
          {"Empresa"}
        </Link>
        <div className={styles["job-attributes"]}>
          <div className={styles.attribute}>
            <LocationIcon />
            <span className={styles.label}>{`${job.city}, ${job.state}`}</span>
          </div>
          <div className={styles.attribute}>
            <WorkIcon />
            <span className={styles.label}>
              {normalizeWorkModel(job.work_model as WorkModel)}
            </span>
          </div>
          <div className={styles.attribute}>
            <MoneyIcon />
            <span className={styles.label}>
              {job.salary ? formatToCurrency(Number(job.salary)) : "A combinar"}
            </span>
          </div>
          <div className={styles.attribute}>
            <ClockIcon />
            <span className={styles.label}>
              {new Date(job.deadline_date).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.attribute}>
            <StarIcon />
            <span className={styles.label}>
              {normalizeExperienceLevel(
                job.experience_level as ExperienceLevel
              )}
            </span>
          </div>
        </div>
        <span className={styles["about-job-title"]}>Sobre a vaga</span>
        <p className={styles.description}>{job.description}</p>
        <div className={styles["apply-container"]}>
          <ApplyButton jobId={job._id} disabled={alreadyApplied} />
          <span className={styles["deadline-date"]}>{`Até ${formatToLocaleDate(
            job.deadline_date
          )}`}</span>
        </div>
        {alreadyApplied && (
          <p className={styles["already-applied"]}>
            Você já se candidatou para essa vaga!
          </p>
        )}
      </DashboardModal>
    );
  }
};

export default CandidateJobPage;
