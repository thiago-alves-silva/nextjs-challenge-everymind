import { ExperienceLevel } from "@/types/ExperienceLevel";
import { Metadata } from "next";
import { WorkModel } from "@/types/WorkModel";
import LocationIcon from "../../../../../../public/location.svg";
import UserIcon from "../../../../../../public/user.svg";
import WorkIcon from "../../../../../../public/work.svg";
import MoneyIcon from "../../../../../../public/money.svg";
import ClockIcon from "../../../../../../public/clock.svg";
import StarIcon from "../../../../../../public/star.svg";
import CandidatureList from "../../_components/CandidatureList";
import DashboardModal from "@/components/DashboardModal";
import DisableButton from "./_components/DisableButton";
import CandidateStatistics from "./_components/CandidateStatistics";
import formatToCurrency from "@/utils/formatToCurrency";
import formatToLocaleDate from "@/utils/formatToLocaleDate";
import getCandidaturesByJobId from "@/utils/getCandidaturesByJobId";
import getJob from "@/utils/getJob";
import normalizeWorkModel from "@/utils/normalizeWorkModel";
import normalizeExperienceLevel from "@/utils/normalizeExperienceLevel";
import styles from "./page.module.css";
import ProcessSteps from "./_components/ProcessSteps";

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

const CompanyDashboardJobPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const job = await getJob(params.id);

  if (job) {
    const candidatures = await getCandidaturesByJobId(job._id);

    return (
      <DashboardModal className={styles["dashboard-modal"]}>
        <h1 className={styles.title}>{job.title}</h1>
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
              {formatToLocaleDate(job.deadline_date)}
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
        <div>
          <span className={styles["section-title"]}>Sobre a vaga</span>
          <p className={styles.description}>{job.description}</p>
          <hr className={styles["dividing-line"]} />
        </div>
        <div>
          <span className={styles["section-title"]}>Etapas do processo</span>
          <ProcessSteps job={job} />
          <hr className={styles["dividing-line"]} />
        </div>
        {!!candidatures.length && (
          <div>
            <span className={styles["section-title"]}>Estatítiscas</span>
            <CandidateStatistics jobId={params.id} />
            <hr className={styles["dividing-line"]} />
          </div>
        )}
        <div className={styles["candidature-header"]}>
          <div className={styles.count}>
            <span>Candidatos</span>
            <div className={styles.value}>
              <UserIcon />
              <span>{candidatures.length}</span>
            </div>
          </div>
        </div>
        <CandidatureList candidatures={candidatures} />
        <div className={styles.footer}>
          <DisableButton job_id={job._id} />
        </div>
      </DashboardModal>
    );
  }
};

export default CompanyDashboardJobPage;
