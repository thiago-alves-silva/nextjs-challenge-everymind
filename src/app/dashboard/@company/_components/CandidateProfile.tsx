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
        <li>
          <div className={styles.title}>
            <LocationIcon />
            <span>Localidade</span>
          </div>
          <span className={styles.value}>{`${candidate.city ?? ""} - ${
            candidate.state ?? ""
          }`}</span>
        </li>
        <li>
          <div className={styles.title}>
            <RacialIcon />
            <span>Identidade racial</span>
          </div>
          <span className={styles.value}>
            {candidate.racial_identity?.toUpperCase()}
          </span>
        </li>
        <li>
          <div className={styles.title}>
            <CampIcon />
            <span>Descendência indígena</span>
          </div>
          <span className={styles.value}>
            {candidate.indigenous_descendancy ? "Sim" : "Não"}
          </span>
        </li>
        <li>
          <div className={styles.title}>
            <MoneyIcon />
            <span>Renda familiar</span>
          </div>
          <span className={styles.value}>
            Classe {candidate.family_income?.toUpperCase() ?? "-"}
          </span>
        </li>
        <li>
          <div className={styles.title}>
            <DisabilityIcon />
            <span>Deficiêcia</span>
          </div>
          <span className={styles.value}>
            {candidate.has_disability ? "Sim" : "Não"}
          </span>
        </li>
        <li>
          <div className={styles.title}>
            <LgbtIcon />
            <span>LGBT</span>
          </div>
          <span className={styles.value}>
            {candidate.is_lgbtqia ? "Sim" : "Não"}
          </span>
        </li>
      </ul>
    </>
  );
};

export default CandidateProfile;
