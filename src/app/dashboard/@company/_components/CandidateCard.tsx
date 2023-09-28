import { RacialIdentity } from "@/types/RacialIdentity";
import { Candidate } from "@/types/ICandidate";
import DisabilityIcon from "../../../../../public/disability.svg";
import LgbtIcon from "../../../../../public/lgbt.svg";
import RacialIcon from "../../../../../public/racial.svg";
import styles from "./CandidateCard.module.css";
import Image from "next/image";

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const racialMinorities: RacialIdentity[] = ["preto", "pardo"];
  const isRacialMinority = racialMinorities.includes(
    candidate.racial_identity!
  );
  const location =
    candidate.city && candidate.state
      ? `${candidate.city}, ${candidate.state}`
      : null;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={`/api/candidate/image/${candidate.profile_image}`}
          alt="Foto de perfil"
          width={40}
          height={40}
        />
      </div>
      <span className={styles.name}>{candidate.name}</span>
      <ul className={styles["minorities-list"]}>
        {candidate.has_disability && (
          <li>
            <DisabilityIcon />
          </li>
        )}
        {candidate.is_lgbtqia && (
          <li>
            <LgbtIcon />
          </li>
        )}
        {isRacialMinority && (
          <li>
            <RacialIcon />
          </li>
        )}
      </ul>
      <span className={styles.email} title={candidate.email}>
        {candidate.email}
      </span>
      {location && <span className={styles.location}>{location}</span>}
    </div>
  );
};

export default CandidateCard;
