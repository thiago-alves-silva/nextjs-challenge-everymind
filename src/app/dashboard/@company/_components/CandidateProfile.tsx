import { CandidateApi } from "@/types/ICandidate";
import EmailIcon from "../../../../../public/mail.svg";
import PhoneIcon from "../../../../../public/phone.svg";
import HourglassIcon from "../../../../../public/hourglass.svg";
import LocationIcon from "../../../../../public/location.svg";
import RacialIcon from "../../../../../public/racial.svg";
import MoneyIcon from "../../../../../public/money.svg";
import DisabilityIcon from "../../../../../public/disability.svg";
import LgbtIcon from "../../../../../public/lgbt.svg";
import CampIcon from "../../../../../public/camp.svg";
import getAgeByBirthDate from "@/utils/getAgeByBirthDate";
import styles from "./CandidateProfile.module.css";
import Image from "next/image";
import normalizeRacialIdentity from "@/utils/normalizeRacialIdentity";
import { RacialIdentity } from "@/types/RacialIdentity";

interface CandidateProfileProps {
  candidate: CandidateApi;
}

const CandidateProfile = ({ candidate }: CandidateProfileProps) => {
  const age = getAgeByBirthDate(new Date(candidate.birthdate));

  return (
    <>
      <div className={styles.image}>
        <Image
          src={`/api/candidate/image/${candidate.profile_image}`}
          alt="Foto de perfil"
          width={96}
          height={96}
        />
      </div>
      <span className={styles.name}>{candidate.name}</span>
      <ul className={styles["attribute-list"]}>
        <li>
          <div className={styles.title}>
            <EmailIcon />
            <span>E-mail</span>
          </div>
          <span className={styles.value}>{candidate.email}</span>
        </li>
        <li>
          <div className={styles.title}>
            <PhoneIcon />
            <span>Telefone</span>
          </div>
          <span className={styles.value}>{candidate.phone}</span>
        </li>
        <li>
          <div className={styles.title}>
            <HourglassIcon />
            <span>Idade</span>
          </div>
          <span className={styles.value}>{`${age} anos`}</span>
        </li>
        {(candidate.city || candidate.state) && (
          <li>
            <div className={styles.title}>
              <LocationIcon />
              <span>Localidade</span>
            </div>
            <span className={styles.value}>
              {[candidate.city, candidate.state].join(" - ")}
            </span>
          </li>
        )}
        {candidate.racial_identity && (
          <li>
            <div className={styles.title}>
              <RacialIcon />
              <span>Identidade racial</span>
            </div>
            <span className={styles.value}>
              {normalizeRacialIdentity(
                candidate.racial_identity as RacialIdentity
              )}
            </span>
          </li>
        )}
        {candidate.indigenous_descendancy && (
          <li>
            <div className={styles.title}>
              <CampIcon />
              <span>Descendência indígena</span>
            </div>
            <span className={styles.value}>Sim</span>
          </li>
        )}
        {candidate.family_income && (
          <li>
            <div className={styles.title}>
              <MoneyIcon />
              <span>Renda familiar</span>
            </div>
            <span className={styles.value}>
              Classe {candidate.family_income.toUpperCase()}
            </span>
          </li>
        )}
        {candidate.has_disability && (
          <li>
            <div className={styles.title}>
              <DisabilityIcon />
              <span>Deficiêcia</span>
            </div>
            <span className={styles.value}>Sim</span>
          </li>
        )}
        {candidate.is_lgbtqia && (
          <li>
            <div className={styles.title}>
              <LgbtIcon />
              <span>LGBT</span>
            </div>
            <span className={styles.value}>Sim</span>
          </li>
        )}
      </ul>
    </>
  );
};

export default CandidateProfile;
