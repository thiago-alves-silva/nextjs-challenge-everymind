import { Metadata } from "next";
import MailIcon from "../../../../../../public/mail.svg";
import PhoneIcon from "../../../../../../public/phone.svg";
import LocationIcon from "../../../../../../public/location.svg";
import DashboardModal from "@/components/DashboardModal";
import Image from "next/image";
import JobCard from "./_components/JobCard";
import Link from "next/link";
import getCompany from "@/utils/getCompany";
import getJobListByCompany from "@/utils/getJobListByCompany";
import normalizeJob from "@/utils/normalizeJob";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const company = await getCompany(params.id);

  return {
    title: company?.name || `Empresa ${params.id}`,
  };
}

const CandidateCompanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await getCompany(params.id);
  const jobs = company ? await getJobListByCompany(company._id) : null;

  return (
    <DashboardModal>
      <div className={styles["profile-image"]}>
        <Image
          src={`/api/company/image/${company?.profile_image}`}
          alt="Foto de perfil"
          width={96}
          height={96}
        />
      </div>
      <span className={styles["profile-name"]}>{company?.name}</span>
      <ul className={styles["data-list"]}>
        <li>
          <div className={styles["label-container"]}>
            <MailIcon className={styles.icon} />
            <span className={styles.label}>E-mail</span>
          </div>
          <a href={`mailto:${company?.email}`} className={styles.data}>
            {company?.email}
          </a>
        </li>
        <li>
          <div className={styles["label-container"]}>
            <PhoneIcon className={styles.icon} />
            <span className={styles.label}>Telefone</span>
          </div>
          <a
            href={`tel:+55${company?.phone.replace(/\D/g, "")}`}
            className={styles.data}
          >
            {company?.phone}
          </a>
        </li>
        <li>
          <div className={styles["label-container"]}>
            <LocationIcon className={styles.icon} />
            <span className={styles.label}>Localidade</span>
          </div>
          <address
            className={styles.data}
          >{`${company?.city}, ${company?.state}`}</address>
        </li>
      </ul>
      {jobs?.length && (
        <div>
          <span className={styles["job-title"]}>Vagas publicadas</span>
          <ul className={styles["job-list"]}>
            {jobs.map((job) => (
              <li key={job._id} className={styles["job-item"]}>
                <Link href={`/dashboard/jobs/${job._id}`}>
                  <JobCard job={normalizeJob(job)} elapsedTime={true} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardModal>
  );
};

export default CandidateCompanyPage;
